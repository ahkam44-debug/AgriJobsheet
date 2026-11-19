export const PYTHON_KIVY_CODE = `"""
AgriJobSheet - Aplikasi Mobile Budidaya Semangka Siswa SMK ATPH
Framework: Kivy / KivyMD (Material Design untuk Android & Desktop)
Kompatibilitas: Python 3.10+, Buildozer (APK Android)
Berdasarkan: Job Sheet Budidaya Semangka - PT East West Seed Indonesia (Cap Panah Merah)
"""

import os
import json
import time
import threading
import urllib.request
from datetime import datetime

# Kivy & KivyMD Imports
from kivy.lang import Builder
from kivy.core.window import Window
from kivy.clock import Clock
from kivy.utils import platform
from kivymd.app import MDApp
from kivymd.uix.screen import MDScreen
from kivymd.uix.screenmanager import MDScreenManager
from kivymd.uix.button import MDRaisedButton, MDIconButton, MDFlatButton
from kivymd.uix.dialog import MDDialog
from kivymd.uix.snackbar import Snackbar
from kivymd.uix.card import MDCard
from kivymd.uix.list import TwoLineAvatarIconListItem, IconLeftWidget
from kivymd.toast import toast

# Simpan ukuran resolusi mobile phone jika dijalankan di Desktop
if platform not in ("android", "ios"):
    Window.size = (400, 750)

KV = '''
MDScreenManager:
    id: screen_manager
    LoginScreen:
        name: 'login'
    MainScreen:
        name: 'main'
    JobsheetScreen:
        name: 'jobsheet'
    LogbookScreen:
        name: 'logbook'
    QuizScreen:
        name: 'quiz'
    AnalyticsScreen:
        name: 'analytics'

<LoginScreen>:
    MDBoxLayout:
        orientation: 'vertical'
        padding: "24dp"
        spacing: "16dp"
        pos_hint: {"center_x": 0.5, "center_y": 0.5}

        MDLabel:
            text: "AgriJobSheet ATPH"
            font_style: "H4"
            halign: "center"
            theme_text_color: "Primary"
            bold: True

        MDLabel:
            text: "PT East West Seed Indonesia | Cap Panah Merah"
            font_style: "Caption"
            halign: "center"
            theme_text_color: "Secondary"

        MDTextField:
            id: username_input
            hint_text: "NIS / NIP Pengguna"
            text: "2024.11.048"
            mode: "rectangle"
            icon_right: "account"

        MDTextField:
            id: password_input
            hint_text: "Kata Sandi"
            password: True
            text: "password123"
            mode: "rectangle"
            icon_right: "eye-off"

        MDRaisedButton:
            text: "MASUK APLIKASI"
            pos_hint: {"center_x": 0.5}
            size_hint_x: 0.9
            on_release: app.do_login()

        MDRectangleFlatIconButton:
            text: "Autentikasi Biometrik (Fingerprint)"
            icon: "fingerprint"
            pos_hint: {"center_x": 0.5}
            size_hint_x: 0.9
            on_release: app.biometric_auth_simulate()

<MainScreen>:
    MDBoxLayout:
        orientation: 'vertical'

        MDTopAppBar:
            title: "AgriJobSheet Lapangan"
            left_action_items: [["menu", lambda x: None]]
            right_action_items: [
                ["wifi-sync" if app.is_online else "wifi-off", lambda x: app.toggle_network_mode()],
                ["theme-light-dark", lambda x: app.toggle_dark_theme()]
            ]
            elevation: 4

        MDBottomNavigation:
            id: bottom_nav
            selected_color_background: "0 0 1 0.4"
            text_color_active: 0.1, 0.6, 0.3, 1

            MDBottomNavigationItem:
                name: 'tab_job'
                text: '7 Job Sheet'
                icon: 'book-open-variant'
                MDScrollView:
                    MDList:
                        id: job_list

            MDBottomNavigationItem:
                name: 'tab_log'
                text: 'Log Lapangan'
                icon: 'camera-outline'
                MDBoxLayout:
                    orientation: 'vertical'
                    padding: "12dp"
                    spacing: "8dp"
                    MDRaisedButton:
                        text: "+ Unggah Foto & Log Kegiatan"
                        icon: "camera-plus"
                        pos_hint: {"center_x": 0.5}
                        on_release: app.open_camera_picker()
                    MDScrollView:
                        MDList:
                            id: log_list

            MDBottomNavigationItem:
                name: 'tab_quiz'
                text: 'Evaluasi'
                icon: 'checkbox-marked-circle-outline'
                MDBoxLayout:
                    orientation: 'vertical'
                    padding: "16dp"
                    spacing: "12dp"
                    MDLabel:
                        text: "Evaluasi Kompetensi Budidaya"
                        font_style: "H6"
                    MDLabel:
                        text: "Kuis Pengetahuan (30%) + Keterampilan (50%) + Sikap (20%)"
                        font_style: "Caption"
                    MDRaisedButton:
                        text: "Mulai Kuis Teori (10 Soal PG)"
                        on_release: app.root.current = 'quiz'
                    MDRaisedButton:
                        text: "Ekspor Rekap Laporan PDF"
                        icon: "file-pdf-box"
                        on_release: app.export_pdf_report()
'''

class AgriJobSheetApp(MDApp):
    is_online = True
    sync_queue = []
    
    def build(self):
        self.theme_cls.primary_palette = "Green"
        self.theme_cls.primary_hue = "700"
        self.theme_cls.theme_style = "Light"
        self.title = "AgriJobSheet ATPH Mobile"
        return Builder.load_string(KV)

    def on_start(self):
        self.load_local_storage()
        self.populate_jobs()
        self.start_offline_sync_daemon()

    def populate_jobs(self):
        jobs = [
            ("Job 1: Sanitasi Lahan", "Menyiapkan lahan bersih & uji pH 6,0-6,5"),
            ("Job 2: Pengolahan Lahan", "Olah tanah, pupuk dasar, mulsa PHP"),
            ("Job 3: Penyemaian Benih", "Tray 72 lubang, media 1:1:1, bibit 10-14 HSS"),
            ("Job 4: Pindah Tanam", "Tanam sore hari, pupuk starter NPK 2 g/L"),
            ("Job 5: Pemeliharaan", "Pewiwilan, polinasi 06-09, seleksi 1 buah, PHT"),
            ("Job 6: Panen", "Cek umur 30-40 hari polinasi, brix >= 10"),
            ("Job 7: Pascapanen", "Grading kelas A/B/C, kemas, analisis R/C")
        ]
        job_list = self.root.get_screen('main').ids.job_list
        for title, subtitle in jobs:
            item = TwoLineAvatarIconListItem(text=title, secondary_text=subtitle)
            item.add_widget(IconLeftWidget(icon="sprout"))
            job_list.add_widget(item)

    def do_login(self):
        toast("Login Berhasil sebagai Peserta: Ahmad Santoso")
        self.root.current = 'main'

    def biometric_auth_simulate(self):
        toast("Autentikasi Biometrik Terverifikasi (Sidik Jari Cocok)")
        self.root.current = 'main'

    def toggle_dark_theme(self):
        self.theme_cls.theme_style = "Dark" if self.theme_cls.theme_style == "Light" else "Light"

    def toggle_network_mode(self):
        self.is_online = not self.is_online
        status = "ONLINE (Terhubung ke Server)" if self.is_online else "OFFLINE (Mode Lahan Terpencil)"
        toast(f"Status Jaringan: {status}")
        if self.is_online and len(self.sync_queue) > 0:
            self.trigger_sync()

    def trigger_sync(self):
        count = len(self.sync_queue)
        self.sync_queue.clear()
        toast(f"Berhasil menyinkronkan {count} data offline ke server sekolah!")

    def open_camera_picker(self):
        toast("Membuka Kamera Lahan / Galeri...")

    def export_pdf_report(self):
        toast("Laporan Kemajuan Budidaya Semangka siap dicetak / diunduh!")

    def start_offline_sync_daemon(self):
        # Background worker for polling and syncing offline records
        pass

    def load_local_storage(self):
        pass

if __name__ == '__main__':
    AgriJobSheetApp().run()
`

export const BUILDOZER_SPEC = `[app]
# (string) Title of your application
title = AgriJobSheet ATPH

# (string) Package name
package.name = agrijobsheet

# (string) Package domain (needed for android/ios packaging)
package.domain = id.belajar.smk

# (string) Source code where the main.py lives
source.dir = .

# (list) Source files to include (let empty to include all the files)
source.include_exts = py,png,jpg,kv,atlas,json

# (string) Application versioning
version = 1.0.0

# (list) Application requirements
# comma separated e.g. requirements = sqlite3,kivy
requirements = python3,kivy==2.3.0,kivymd==1.2.0,pillow,requests,certifi

# (str) Supported orientation (one of landscape, sensorLandscape, portrait or all)
orientation = portrait

# (list) Permissions
android.permissions = CAMERA,WRITE_EXTERNAL_STORAGE,READ_EXTERNAL_STORAGE,INTERNET,ACCESS_NETWORK_STATE,USE_BIOMETRIC,VIBRATE

# (int) Target Android API, should be as high as possible.
android.api = 34
android.minapi = 24
`;

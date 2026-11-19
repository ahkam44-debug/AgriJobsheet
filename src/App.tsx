import React, { useState, useEffect } from 'react';
import { 
  UserProfile, 
  FieldLogEntry, 
  AssessmentResult, 
  NotificationItem, 
  ChatMessage,
  CommodityId,
  CommodityProgressMap,
  CommodityAssessmentMap,
  StepGradeRecord,
  StudentProgressDirectory,
  StudentStepGradesMap
} from './types';
import { COMMODITIES } from './data/commoditiesData';
import { 
  getStoredUsers,
  saveStoredUsers,
  getStoredCurrentUser, 
  saveStoredCurrentUser,
  getStoredSelectedCommodity,
  saveStoredSelectedCommodity,
  getStoredLoggedIn,
  saveStoredLoggedIn,
  getStoredLogs, 
  saveStoredLogs,
  getStoredProgressMap, 
  saveStoredProgressMap,
  getStoredAssessmentMap, 
  saveStoredAssessmentMap,
  getStoredNotifications, 
  saveStoredNotifications,
  getStoredChat, 
  saveStoredChat,
  getStoredOfflineQueue,
  saveStoredOfflineQueue,
  getStoredStudentStepGrades,
  saveStoredStudentStepGrades,
  getStoredStudentProgressDir,
  saveStoredStudentProgressDir,
  createEmptyCommodityProgressMap,
  getStoredCustomPlanningDir,
  saveStoredCustomPlanningDir,
  CustomPlanningDirectory
} from './utils/storage';
import { CommodityPlanningDocument } from './data/planningData';
import { LoginDashboardView } from './components/LoginDashboardView';
import { CommodityPickerView } from './components/CommodityPickerView';
import { PlanningView } from './components/PlanningView';
import { HeaderTopBar } from './components/HeaderTopBar';
import { MobileDeviceFrame } from './components/MobileDeviceFrame';
import { JobSheetView } from './components/JobSheetView';
import { FieldLogbookView } from './components/FieldLogbookView';
import { TeacherStepGradingView } from './components/TeacherStepGradingView';
import { QuizAssessmentView } from './components/QuizAssessmentView';
import { AnalyticsDashboardView } from './components/AnalyticsDashboardView';
import { UserManagementView } from './components/UserManagementView';
import { PythonSourceModal } from './components/PythonSourceModal';
import { NotificationModal } from './components/NotificationModal';
import { BiometricModal } from './components/BiometricModal';
import { LiveChatHelpdesk } from './components/LiveChatHelpdesk';
import { PdfExportModal } from './components/PdfExportModal';
import { 
  BookOpen, 
  Camera, 
  Award, 
  TrendingUp, 
  Users
} from 'lucide-react';

export default function App() {
  // Auth & Commodity States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(getStoredLoggedIn);
  const [selectedCommodityId, setSelectedCommodityId] = useState<CommodityId>(getStoredSelectedCommodity);
  const [initialJobId, setInitialJobId] = useState<number>(1);
  const [pendingBioLogin, setPendingBioLogin] = useState<{
    user: UserProfile;
    commodityId: CommodityId;
    jobId: number;
  } | null>(null);

  // App States
  const [users, setUsers] = useState<UserProfile[]>(getStoredUsers);
  const [currentUser, setCurrentUser] = useState<UserProfile>(getStoredCurrentUser);
  const [activeTab, setActiveTab] = useState<string>('komoditas');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    return document.documentElement.classList.contains('dark') || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isMobileDeviceView, setIsMobileDeviceView] = useState<boolean>(false);

  // Data States
  const [logs, setLogs] = useState<FieldLogEntry[]>(getStoredLogs);
  const [progressMap, setProgressMap] = useState<CommodityProgressMap>(getStoredProgressMap);
  const [studentProgressDir, setStudentProgressDir] = useState<StudentProgressDirectory>(getStoredStudentProgressDir);
  const [stepGradesMap, setStepGradesMap] = useState<StudentStepGradesMap>(getStoredStudentStepGrades);
  const [customPlanningDir, setCustomPlanningDir] = useState<CustomPlanningDirectory>(getStoredCustomPlanningDir);
  const [assessmentMap, setAssessmentMap] = useState<CommodityAssessmentMap>(getStoredAssessmentMap);
  const [notifications, setNotifications] = useState<NotificationItem[]>(getStoredNotifications);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(getStoredChat);
  const [syncQueue, setSyncQueue] = useState<any[]>(getStoredOfflineQueue);

  // Modals
  const [showNotifModal, setShowNotifModal] = useState<boolean>(false);
  const [showBiometricModal, setShowBiometricModal] = useState<boolean>(false);
  const [showChatModal, setShowChatModal] = useState<boolean>(false);
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [defaultLogJobId, setDefaultLogJobId] = useState<number>(5);
  const [defaultGradingJobId, setDefaultGradingJobId] = useState<number>(1);

  const selectedCommodity = COMMODITIES[selectedCommodityId];
  const activeProgress =
    currentUser.role === 'peserta'
      ? studentProgressDir[currentUser.id]?.[selectedCommodityId] || progressMap[selectedCommodityId]
      : progressMap[selectedCommodityId];
  const activeStepGrades =
    currentUser.role === 'peserta'
      ? stepGradesMap[currentUser.id]?.[selectedCommodityId] || {}
      : stepGradesMap['siswa-xi-1']?.[selectedCommodityId] || {};
  const activeAssessment = assessmentMap[selectedCommodityId];

  // Theme synchronization with documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Persist states
  useEffect(() => {
    saveStoredLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    saveStoredSelectedCommodity(selectedCommodityId);
  }, [selectedCommodityId]);

  useEffect(() => {
    saveStoredUsers(users);
  }, [users]);

  useEffect(() => {
    saveStoredCurrentUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    saveStoredLogs(logs);
  }, [logs]);

  useEffect(() => {
    saveStoredProgressMap(progressMap);
  }, [progressMap]);

  useEffect(() => {
    saveStoredAssessmentMap(assessmentMap);
  }, [assessmentMap]);

  useEffect(() => {
    saveStoredNotifications(notifications);
  }, [notifications]);

  useEffect(() => {
    saveStoredChat(chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    saveStoredOfflineQueue(syncQueue);
  }, [syncQueue]);

  useEffect(() => {
    saveStoredStudentProgressDir(studentProgressDir);
  }, [studentProgressDir]);

  useEffect(() => {
    saveStoredStudentStepGrades(stepGradesMap);
  }, [stepGradesMap]);

  useEffect(() => {
    saveStoredCustomPlanningDir(customPlanningDir);
  }, [customPlanningDir]);

  // Login & Commodity Switch Handlers
  const handleCompleteLogin = (user: UserProfile, commodityId: CommodityId, jobId: number) => {
    setCurrentUser(user);
    setSelectedCommodityId(commodityId);
    setInitialJobId(jobId);
    setActiveTab('komoditas');
    setIsLoggedIn(true);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Selamat Datang, ${user.name.split(' ')[0]}`,
      message: `Login terverifikasi (${user.identifier}). Silakan pilih komoditas dan modul Job Sheet.`,
      time: "Baru saja",
      read: false,
      type: "sistem"
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const handleLogoutToDashboard = () => {
    setIsLoggedIn(false);
  };

  const handleSelectCommodityInApp = (commodityId: CommodityId) => {
    setSelectedCommodityId(commodityId);
    setInitialJobId(1);
  };

  // User Management Handlers (Adding/deleting users restricted to Kepala Sekolah & Admin)
  const handleAddUser = (newUser: UserProfile) => {
    if (currentUser.role !== 'admin') return;
    setUsers(prev => [newUser, ...prev]);
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: "Pengguna Baru Berhasil Ditambahkan",
      message: `${newUser.name} (${newUser.role}) telah terdaftar di sistem.`,
      time: "Baru saja",
      read: false,
      type: "sistem"
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const handleAddBulkUsers = (newUsers: UserProfile[]) => {
    if (currentUser.role !== 'admin') return;
    if (newUsers.length === 0) return;
    setUsers(prev => [...newUsers, ...prev]);
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `${newUsers.length} Akun Kolektif Berhasil Ditambahkan`,
      message: `Daftar pegawai, guru, atau siswa sebanyak ${newUsers.length} akun telah masuk ke sistem.`,
      time: "Baru saja",
      read: false,
      type: "sistem"
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    const isAdmin = currentUser.role === 'admin';
    if (!isAdmin && updatedUser.id !== currentUser.id) {
      return;
    }
    const sanitizedUser: UserProfile = isAdmin
      ? updatedUser
      : { ...updatedUser, role: currentUser.role };

    setUsers(prev => prev.map(u => u.id === sanitizedUser.id ? sanitizedUser : u));
    if (currentUser.id === sanitizedUser.id) {
      setCurrentUser(sanitizedUser);
    }
    setLogs(prevLogs =>
      prevLogs.map(log =>
        log.userId === sanitizedUser.id
          ? { ...log, studentName: sanitizedUser.name }
          : log
      )
    );
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: "Data Akun Berhasil Diperbarui",
      message: `Perubahan data untuk ${sanitizedUser.name} (${sanitizedUser.identifier}) telah disimpan.`,
      time: "Baru saja",
      read: false,
      type: "sistem"
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const handleDeleteUser = (userId: string) => {
    if (currentUser.role !== 'admin') return;
    setUsers(prev => prev.filter(u => u.id !== userId));
    if (currentUser.id === userId && users.length > 1) {
      const remaining = users.filter(u => u.id !== userId);
      setCurrentUser(remaining[0]);
    }
  };

  // Helper to update a specific student's step completion
  const updateStudentStepInDir = (
    studentId: string,
    commodityId: CommodityId,
    jobId: number,
    stepId: number,
    completed: boolean
  ) => {
    setStudentProgressDir(prevDir => {
      const studentProg = prevDir[studentId] || createEmptyCommodityProgressMap();
      const commodityProg = studentProg[commodityId] || {};
      const currentJobProg = commodityProg[jobId] || { completedStepIds: [], numeracyAnswered: false, updatedAt: Date.now() };
      let newStepIds = [...currentJobProg.completedStepIds];

      if (completed) {
        if (!newStepIds.includes(stepId)) newStepIds.push(stepId);
      } else {
        newStepIds = newStepIds.filter(id => id !== stepId);
      }

      return {
        ...prevDir,
        [studentId]: {
          ...studentProg,
          [commodityId]: {
            ...commodityProg,
            [jobId]: {
              ...currentJobProg,
              completedStepIds: newStepIds,
              updatedAt: Date.now()
            }
          }
        }
      };
    });
  };

  // Handle step update from JobSheetView (scoped by selectedCommodityId)
  const handleUpdateStep = (jobId: number, stepId: number, completed: boolean) => {
    const targetStudentId = currentUser.role === 'peserta' ? currentUser.id : 'siswa-xi-1';
    updateStudentStepInDir(targetStudentId, selectedCommodityId, jobId, stepId, completed);

    setProgressMap(prevMap => {
      const commodityProg = prevMap[selectedCommodityId] || {};
      const currentJobProg = commodityProg[jobId] || { completedStepIds: [], numeracyAnswered: false, updatedAt: Date.now() };
      let newStepIds = [...currentJobProg.completedStepIds];

      if (completed) {
        if (!newStepIds.includes(stepId)) newStepIds.push(stepId);
      } else {
        newStepIds = newStepIds.filter(id => id !== stepId);
      }

      if (isOffline) {
        setSyncQueue(q => [...q, { type: 'step_progress', commodityId: selectedCommodityId, jobId, stepId, completed, timestamp: Date.now() }]);
      }

      return {
        ...prevMap,
        [selectedCommodityId]: {
          ...commodityProg,
          [jobId]: {
            ...currentJobProg,
            completedStepIds: newStepIds,
            updatedAt: Date.now()
          }
        }
      };
    });
  };

  // Teacher Step-by-Step Grading Handlers
  const handleSaveStepGrade = (
    studentId: string,
    commodityId: CommodityId,
    jobId: number,
    stepId: number,
    record: StepGradeRecord
  ) => {
    setStepGradesMap(prev => {
      const studentGrades = prev[studentId] || {};
      const commodityGrades = studentGrades[commodityId] || {};
      const jobGrades = commodityGrades[jobId] || {};
      return {
        ...prev,
        [studentId]: {
          ...studentGrades,
          [commodityId]: {
            ...commodityGrades,
            [jobId]: {
              ...jobGrades,
              [stepId]: record
            }
          }
        }
      };
    });
  };

  const handleBatchGradeJob = (
    studentId: string,
    commodityId: CommodityId,
    jobId: number,
    records: Record<number, StepGradeRecord>,
    alsoMarkCompletedIds?: number[]
  ) => {
    setStepGradesMap(prev => {
      const studentGrades = prev[studentId] || {};
      const commodityGrades = studentGrades[commodityId] || {};
      const jobGrades = commodityGrades[jobId] || {};
      return {
        ...prev,
        [studentId]: {
          ...studentGrades,
          [commodityId]: {
            ...commodityGrades,
            [jobId]: {
              ...jobGrades,
              ...records
            }
          }
        }
      };
    });

    if (alsoMarkCompletedIds && alsoMarkCompletedIds.length > 0) {
      setStudentProgressDir(prevDir => {
        const studentProg = prevDir[studentId] || createEmptyCommodityProgressMap();
        const commodityProg = studentProg[commodityId] || {};
        const currentJobProg = commodityProg[jobId] || { completedStepIds: [], numeracyAnswered: false, updatedAt: Date.now() };
        const mergedIds = Array.from(new Set([...currentJobProg.completedStepIds, ...alsoMarkCompletedIds]));
        return {
          ...prevDir,
          [studentId]: {
            ...studentProg,
            [commodityId]: {
              ...commodityProg,
              [jobId]: {
                ...currentJobProg,
                completedStepIds: mergedIds,
                updatedAt: Date.now()
              }
            }
          }
        };
      });
    }

    const gradedStudent = users.find(u => u.id === studentId);
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Penilaian Job ${jobId} Disimpan`,
      message: `${Object.keys(records).length} langkah kerja ${gradedStudent?.name || 'siswa'} pada ${COMMODITIES[commodityId].name} telah dinilai oleh ${currentUser.name}.`,
      time: "Baru saja",
      read: false,
      type: "evaluasi"
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const handleResetJobGrades = (studentId: string, commodityId: CommodityId, jobId: number) => {
    setStepGradesMap(prev => {
      const studentGrades = { ...(prev[studentId] || {}) };
      const commodityGrades = { ...(studentGrades[commodityId] || {}) };
      delete commodityGrades[jobId];
      return {
        ...prev,
        [studentId]: {
          ...studentGrades,
          [commodityId]: commodityGrades
        }
      };
    });
  };

  // Save assessment scoped to active commodity
  const handleSaveAssessment = (result: AssessmentResult) => {
    setAssessmentMap(prev => ({
      ...prev,
      [selectedCommodityId]: result
    }));
  };

  // Handle adding log entry
  const handleAddLog = (entry: Omit<FieldLogEntry, 'id' | 'timestamp' | 'teacherVerified'>) => {
    const newEntry: FieldLogEntry = {
      ...entry,
      id: `log-${Date.now()}`,
      timestamp: Date.now(),
      teacherVerified: false,
      status: isOffline ? 'pending_offline' : 'synced'
    };

    setLogs(prev => [newEntry, ...prev]);

    if (isOffline) {
      setSyncQueue(q => [...q, { type: 'log_entry', data: newEntry }]);
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: "Disimpan di Memori HP (Offline)",
        message: `Laporan '${entry.activityTitle}' tersimpan di memori lokal HP. Akan otomatis diunggah saat terhubung internet.`,
        time: "Baru saja",
        read: false,
        type: "sinkron"
      };
      setNotifications(prev => [notif, ...prev]);
    } else {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: "Laporan Lapangan Tersinkron",
        message: `Laporan '${entry.activityTitle}' berhasil dikirim ke server sekolah.`,
        time: "Baru saja",
        read: false,
        type: "sinkron"
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  // Verify log by instructor
  const handleVerifyLog = (logId: string, feedback: string) => {
    setLogs(prev => prev.map(l => {
      if (l.id === logId) {
        return {
          ...l,
          teacherVerified: true,
          teacherFeedback: feedback || "Telah diperiksa dan diverifikasi oleh instruktur."
        };
      }
      return l;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: "Laporan Telah Diverifikasi Instruktur",
      message: `Catatan lapangan Anda telah diparaf oleh ${currentUser.name}.`,
      time: "Baru saja",
      read: false,
      type: "evaluasi"
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Trigger manual or automatic sync
  const handleTriggerSync = () => {
    if (isOffline) return;
    setIsSyncing(true);

    setTimeout(() => {
      setLogs(prev => prev.map(l => ({ ...l, status: 'synced' })));
      const count = syncQueue.length;
      setSyncQueue([]);
      setIsSyncing(false);

      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: "Sinkronisasi Berhasil",
        message: `Semua data (${count || 1} entri) telah tersinkronisasi 2 arah antara HP dan Server Sekolah.`,
        time: "Baru saja",
        read: false,
        type: "sinkron"
      };
      setNotifications(prev => [notif, ...prev]);
    }, 1200);
  };

  // Toggle offline mode with auto sync when going back online
  const handleToggleOffline = () => {
    if (isOffline) {
      setIsOffline(false);
      handleTriggerSync();
    } else {
      setIsOffline(true);
    }
  };

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  // Render Focused Panel Login before entering workspace
  if (!isLoggedIn) {
    return (
      <>
        <LoginDashboardView
          users={users}
          initialUser={currentUser}
          initialCommodityId={selectedCommodityId}
          progressMap={progressMap}
          isDark={isDark}
          onToggleDark={() => setIsDark(!isDark)}
          onOpenBiometricForUser={(usr, commodityId, jobId) => {
            setPendingBioLogin({ user: usr, commodityId, jobId });
            setShowBiometricModal(true);
          }}
          onLogin={handleCompleteLogin}
        />

        <BiometricModal
          isOpen={showBiometricModal}
          onClose={() => {
            setShowBiometricModal(false);
            setPendingBioLogin(null);
          }}
          currentUser={pendingBioLogin?.user || currentUser}
          onSuccess={() => {
            if (pendingBioLogin) {
              handleCompleteLogin(
                pendingBioLogin.user,
                pendingBioLogin.commodityId,
                pendingBioLogin.jobId
              );
              setPendingBioLogin(null);
            }
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-emerald-500/20">
      
      {/* Top Header Bar */}
      <HeaderTopBar
        users={users}
        currentUser={currentUser}
        onSwitchUser={setCurrentUser}
        selectedCommodity={selectedCommodity}
        onSelectCommodity={handleSelectCommodityInApp}
        onLogout={handleLogoutToDashboard}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        onOpenBiometric={() => setShowBiometricModal(true)}
        onOpenNotifications={() => setShowNotifModal(true)}
        onOpenChat={() => setShowChatModal(true)}
        onOpenPdf={() => setShowPdfModal(true)}
        unreadNotifsCount={unreadNotifsCount}
        isMobileDeviceView={isMobileDeviceView}
        onToggleDeviceView={() => setIsMobileDeviceView(!isMobileDeviceView)}
        syncQueueCount={syncQueue.length}
        onTriggerSync={handleTriggerSync}
        isSyncing={isSyncing}
      />

      {/* Main View Wrapped in Device Frame or Full Desktop */}
      <MobileDeviceFrame 
        isMobileDeviceView={isMobileDeviceView}
        isOffline={isOffline}
      >
        <main className="pb-20 lg:pb-10">
          {activeTab === 'komoditas' && (
            <CommodityPickerView
              currentUser={currentUser}
              selectedCommodityId={selectedCommodityId}
              progressMap={
                currentUser.role === 'peserta'
                  ? studentProgressDir[currentUser.id] || progressMap
                  : progressMap
              }
              onOpenJobSheet={(commodityId, jobId) => {
                setSelectedCommodityId(commodityId);
                setInitialJobId(jobId);
                setActiveTab('jobsheet');
              }}
              onOpenPlanning={(commodityId) => {
                setSelectedCommodityId(commodityId);
                setActiveTab('perencanaan');
              }}
            />
          )}

          {activeTab === 'perencanaan' && (
            <PlanningView
              currentUser={currentUser}
              selectedCommodityId={selectedCommodityId}
              customPlan={customPlanningDir[currentUser.id]?.[selectedCommodityId]}
              onSaveCustomPlan={(commodityId: CommodityId, doc: CommodityPlanningDocument) => {
                setCustomPlanningDir((prev) => ({
                  ...prev,
                  [currentUser.id]: {
                    ...(prev[currentUser.id] || {}),
                    [commodityId]: doc
                  }
                }));
              }}
              onResetCustomPlan={(commodityId: CommodityId) => {
                setCustomPlanningDir((prev) => {
                  const userDir = { ...(prev[currentUser.id] || {}) };
                  delete userDir[commodityId];
                  return {
                    ...prev,
                    [currentUser.id]: userDir
                  };
                });
              }}
              onSelectCommodity={handleSelectCommodityInApp}
              onOpenJobSheet={(commodityId, jobId = 1) => {
                setSelectedCommodityId(commodityId);
                setInitialJobId(jobId);
                setActiveTab('jobsheet');
              }}
            />
          )}

          {activeTab === 'jobsheet' && (
            <JobSheetView
              commodity={selectedCommodity}
              initialJobId={initialJobId}
              progress={activeProgress}
              stepGrades={activeStepGrades}
              onUpdateStep={handleUpdateStep}
              onGoToLogbook={(jobId) => {
                setDefaultLogJobId(jobId);
                setActiveTab('logbook');
              }}
              onGoToStepGrading={(jobId) => {
                setDefaultGradingJobId(jobId);
                setActiveTab('penilaian');
              }}
              onGoToPlanning={() => setActiveTab('perencanaan')}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'logbook' && (
            <FieldLogbookView
              commodity={selectedCommodity}
              logs={logs}
              onAddLog={handleAddLog}
              onVerifyLog={handleVerifyLog}
              currentUser={currentUser}
              isOffline={isOffline}
              defaultJobId={defaultLogJobId}
            />
          )}

          {activeTab === 'penilaian' && (
            <TeacherStepGradingView
              users={users}
              currentUser={currentUser}
              selectedCommodityId={selectedCommodityId}
              onSelectCommodity={handleSelectCommodityInApp}
              initialJobId={defaultGradingJobId}
              studentProgressDir={studentProgressDir}
              stepGradesMap={stepGradesMap}
              logs={logs}
              onToggleStudentStep={updateStudentStepInDir}
              onSaveStepGrade={handleSaveStepGrade}
              onBatchGradeJob={handleBatchGradeJob}
              onResetJobGrades={handleResetJobGrades}
            />
          )}

          {activeTab === 'evaluasi' && (
            <QuizAssessmentView
              commodity={selectedCommodity}
              currentUser={currentUser}
              savedAssessment={activeAssessment}
              onSaveAssessment={handleSaveAssessment}
              onOpenPdfExport={() => setShowPdfModal(true)}
            />
          )}

          {activeTab === 'analitik' && (
            <AnalyticsDashboardView
              commodity={selectedCommodity}
              currentUser={currentUser}
              logs={logs}
              progress={activeProgress}
              assessment={activeAssessment}
              onTriggerSync={handleTriggerSync}
              isSyncing={isSyncing}
            />
          )}

          {activeTab === 'pengguna' && (
            <UserManagementView
              users={users}
              currentUser={currentUser}
              onSelectUser={setCurrentUser}
              onAddUser={handleAddUser}
              onAddBulkUsers={handleAddBulkUsers}
              onUpdateUser={handleUpdateUser}
              onDeleteUser={handleDeleteUser}
            />
          )}

          {activeTab === 'python' && (
            <PythonSourceModal />
          )}

          <footer className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 pt-5 border-t border-slate-200 dark:border-slate-800 text-center space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
            <div className="font-semibold text-slate-700 dark:text-slate-300">
              Jobsheet Digital SMK Negeri Pertanian Pembangunan 5 Konawe · SMK BISA!
            </div>
            <div>
              Kepala Sekolah:{' '}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                IKHWAL, S.TP., M.Sc.
              </span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              Admin:{' '}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                Ahkam, S.Pd.Gr.,M.Pd.
              </span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              Pengembang:{' '}
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                Tim IT SMKNPP 5 Konawe
              </span>
            </div>
          </footer>
        </main>
      </MobileDeviceFrame>

      {/* Mobile Bottom Navigation Bar */}
      <nav className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 transition-colors lg:hidden ${
        isMobileDeviceView ? 'hidden' : 'block'
      }`}>
        <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-2">
          
          <button
            onClick={() => setActiveTab(activeTab === 'jobsheet' ? 'komoditas' : 'jobsheet')}
            className={`flex flex-col items-center justify-center h-full gap-1 ${
              activeTab === 'jobsheet' || activeTab === 'komoditas'
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px]">{activeTab === 'komoditas' ? 'Komoditas' : 'Job Sheet'}</span>
          </button>

          <button
            onClick={() => setActiveTab('logbook')}
            className={`flex flex-col items-center justify-center h-full gap-1 ${
              activeTab === 'logbook' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Camera className="w-5 h-5" />
            <span className="text-[10px]">Log Lapangan</span>
          </button>

          <button
            onClick={() => setActiveTab('evaluasi')}
            className={`flex flex-col items-center justify-center h-full gap-1 ${
              activeTab === 'evaluasi' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-[10px]">Evaluasi</span>
          </button>

          <button
            onClick={() => setActiveTab('analitik')}
            className={`flex flex-col items-center justify-center h-full gap-1 ${
              activeTab === 'analitik' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-[10px]">Analitik</span>
          </button>

          <button
            onClick={() => setActiveTab('pengguna')}
            className={`flex flex-col items-center justify-center h-full gap-1 ${
              activeTab === 'pengguna' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px]">Guru & Siswa</span>
          </button>

        </div>
      </nav>

      {/* Modals & Dialogs */}
      <NotificationModal
        commodity={selectedCommodity}
        isOpen={showNotifModal}
        onClose={() => setShowNotifModal(false)}
        notifications={notifications}
        onAddNotification={(n) => setNotifications(prev => [n, ...prev])}
        onMarkAsRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))}
      />

      <BiometricModal
        isOpen={showBiometricModal}
        onClose={() => setShowBiometricModal(false)}
        currentUser={currentUser}
        onSuccess={() => {
          const notif: NotificationItem = {
            id: `notif-${Date.now()}`,
            title: "Autentikasi Biometrik Berhasil",
            message: `Identitas ${currentUser.name} telah diverifikasi dengan sidik jari biometrik.`,
            time: "Baru saja",
            read: false,
            type: "sistem"
          };
          setNotifications(prev => [notif, ...prev]);
        }}
      />

      <LiveChatHelpdesk
        commodity={selectedCommodity}
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
        currentUser={currentUser}
        messages={chatMessages}
        onSendMessage={(msg) => setChatMessages(prev => [...prev, msg])}
      />

      <PdfExportModal
        commodity={selectedCommodity}
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        currentUser={currentUser}
        logs={logs}
        progress={activeProgress}
        assessment={activeAssessment}
      />

    </div>
  );
}

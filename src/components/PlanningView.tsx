import React, { useState, useEffect } from 'react';
import { CommodityId, UserProfile } from '../types';
import { COMMODITY_LIST } from '../data/commoditiesData';
import {
  PLANNING_DOCUMENTS,
  CommodityPlanningDocument,
  PlanningBlock
} from '../data/planningData';
import { SCHOOL_LOGO_URL } from '../utils/images';
import {
  FileText,
  Download,
  BookOpen,
  Eye,
  LayoutList,
  ArrowRight,
  Sprout,
  Edit3,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  Calculator,
  Check
} from 'lucide-react';

interface PlanningViewProps {
  currentUser: UserProfile;
  selectedCommodityId: CommodityId;
  customPlan?: CommodityPlanningDocument;
  onSaveCustomPlan: (commodityId: CommodityId, doc: CommodityPlanningDocument) => void;
  onResetCustomPlan: (commodityId: CommodityId) => void;
  onSelectCommodity: (commodityId: CommodityId) => void;
  onOpenJobSheet: (commodityId: CommodityId, jobId?: number) => void;
}

function cloneDoc(doc: CommodityPlanningDocument): CommodityPlanningDocument {
  return JSON.parse(JSON.stringify(doc));
}

function parseLeadingNumber(text: string): number | null {
  const cleaned = text.trim().replace(/\./g, '').replace(',', '.');
  const match = cleaned.match(/^(\d+(\.\d+)?)/);
  if (!match) return null;
  const val = parseFloat(match[1]);
  return Number.isFinite(val) ? val : null;
}

function parseRupiah(text: string): number | null {
  const digits = text.replace(/[^0-9]/g, '');
  if (!digits) return null;
  const val = parseInt(digits, 10);
  return Number.isFinite(val) ? val : null;
}

function formatRupiah(amount: number, withSpace: boolean): string {
  const formatted = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return withSpace ? `Rp ${formatted}` : `Rp${formatted}`;
}

export const PlanningView: React.FC<PlanningViewProps> = ({
  currentUser,
  selectedCommodityId,
  customPlan,
  onSaveCustomPlan,
  onResetCustomPlan,
  onSelectCommodity,
  onOpenJobSheet
}) => {
  const baseDoc = PLANNING_DOCUMENTS[selectedCommodityId];
  const activeDoc = customPlan || baseDoc;
  const hasCustomEdits = Boolean(customPlan);

  const [displayMode, setDisplayMode] = useState<'structured' | 'edit' | 'pdf'>('structured');
  const [confirmReset, setConfirmReset] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  useEffect(() => {
    setConfirmReset(false);
    setFeedbackMsg(null);
  }, [selectedCommodityId]);

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    window.setTimeout(() => {
      setFeedbackMsg((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const commitChange = (updater: (draft: CommodityPlanningDocument) => void) => {
    const draft = cloneDoc(activeDoc);
    updater(draft);
    onSaveCustomPlan(selectedCommodityId, draft);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(`plan-sec-${selectedCommodityId}-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isBudgetTable = (block: Extract<PlanningBlock, { type: 'table' }>) => {
    if (!block.headers) return false;
    const joined = block.headers.join(' ').toLowerCase();
    return joined.includes('harga') && joined.includes('jumlah') && block.headers.length >= 5;
  };

  const recalculateBudgetTable = (sectionIdx: number, blockIdx: number) => {
    commitChange((draft) => {
      const block = draft.sections[sectionIdx]?.blocks[blockIdx];
      if (!block || block.type !== 'table') return;

      const samplePriceCell =
        block.rows.find((r) => r.kind === 'row')?.cells?.[4] || 'Rp 0';
      const useSpace = samplePriceCell.includes('Rp ');

      let currentGroupSum = 0;
      let grandSubtotal = 0;
      let lastReserveAmount = 0;

      for (let i = 0; i < block.rows.length; i++) {
        const r = block.rows[i];
        if (r.kind === 'group') {
          currentGroupSum = 0;
          continue;
        }
        if (r.kind === 'row') {
          const vol = parseLeadingNumber(r.cells[2] || '');
          const price = parseRupiah(r.cells[3] || '');
          if (vol !== null && price !== null) {
            const lineTotal = Math.round(vol * price);
            r.cells[4] = formatRupiah(lineTotal, useSpace);
            currentGroupSum += lineTotal;
            grandSubtotal += lineTotal;
          } else {
            const existing = parseRupiah(r.cells[4] || '') || 0;
            currentGroupSum += existing;
            grandSubtotal += existing;
          }
          continue;
        }
        if (r.kind === 'summary') {
          const lbl = r.label.toLowerCase();
          if (lbl.includes('cadangan')) {
            const pctMatch = lbl.match(/(\d+)\s*%/);
            const pct = pctMatch ? parseInt(pctMatch[1], 10) : 10;
            lastReserveAmount = Math.round((grandSubtotal * pct) / 100);
            r.value = formatRupiah(lastReserveAmount, useSpace);
          } else if (lbl.includes('total anggaran')) {
            r.value = formatRupiah(grandSubtotal + lastReserveAmount, useSpace);
          } else if (lbl.includes('subtotal (a') || lbl.includes('subtotal a + b')) {
            r.value = formatRupiah(grandSubtotal, useSpace);
          } else if (lbl.includes('subtotal')) {
            r.value = formatRupiah(currentGroupSum, useSpace);
          }
        }
      }
    });
    showToast('Jumlah & total anggaran berhasil dihitung ulang.');
  };

  const renderReadBlock = (block: PlanningBlock, idx: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p
            key={idx}
            className={`text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 ${
              block.italic ? 'italic text-slate-600 dark:text-slate-400' : ''
            }`}
          >
            {block.text}
          </p>
        );

      case 'subheading':
        return (
          <h4
            key={idx}
            className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white pt-1"
          >
            {block.text}
          </h4>
        );

      case 'callout':
        return (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
          >
            {(block.label || block.text) && (
              <p>
                {block.label && (
                  <strong className="font-bold text-emerald-900 dark:text-emerald-300 mr-1.5">
                    {block.label}
                  </strong>
                )}
                <span>{block.text}</span>
              </p>
            )}
            {block.bullets && block.bullets.length > 0 && (
              <ul className="list-disc pl-5 space-y-1.5">
                {block.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        );

      case 'bullets':
        return (
          <ul
            key={idx}
            className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300"
          >
            {block.items.map((item, itemIdx) => (
              <li key={itemIdx}>
                {item.lead && (
                  <strong className="font-bold text-slate-900 dark:text-white mr-1">
                    {item.lead}
                  </strong>
                )}
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        );

      case 'table': {
        const colCount =
          block.headers?.length ||
          (() => {
            const firstDataRow = block.rows.find((r) => r.kind === 'row');
            return firstDataRow && firstDataRow.kind === 'row' ? firstDataRow.cells.length : 2;
          })();

        return (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900/60"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-[13px] border-collapse">
                {block.headers && block.headers.length > 0 && (
                  <thead>
                    <tr className="bg-emerald-800 dark:bg-emerald-900 text-white">
                      {block.headers.map((header, hIdx) => {
                        const align = block.colAlign?.[hIdx] || 'left';
                        return (
                          <th
                            key={hIdx}
                            className={`px-3.5 py-2.5 font-bold whitespace-nowrap ${
                              align === 'right'
                                ? 'text-right'
                                : align === 'center'
                                ? 'text-center'
                                : 'text-left'
                            }`}
                          >
                            {header}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                )}
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {block.rows.map((row, rIdx) => {
                    if (row.kind === 'group') {
                      return (
                        <tr
                          key={rIdx}
                          className="bg-emerald-50/90 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-300 font-bold"
                        >
                          <td colSpan={colCount} className="px-3.5 py-2">
                            {row.title}
                          </td>
                        </tr>
                      );
                    }

                    if (row.kind === 'summary') {
                      const isTotal = row.highlight === 'total';
                      const isSubtle = row.highlight === 'subtle';
                      return (
                        <tr
                          key={rIdx}
                          className={
                            isTotal
                              ? 'bg-emerald-900 dark:bg-emerald-800 text-white font-extrabold'
                              : isSubtle
                              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 font-bold text-slate-900 dark:text-white'
                              : 'bg-slate-50 dark:bg-slate-800/50 font-semibold text-slate-800 dark:text-slate-200'
                          }
                        >
                          <td colSpan={row.labelSpan} className="px-3.5 py-2.5">
                            {row.label}
                          </td>
                          <td className="px-3.5 py-2.5 text-right font-mono tabular-nums whitespace-nowrap">
                            {row.value}
                          </td>
                        </tr>
                      );
                    }

                    const isTotalRow = row.highlight === 'total';
                    const isSubtleRow = row.highlight === 'subtle';

                    return (
                      <tr
                        key={rIdx}
                        className={
                          isTotalRow
                            ? 'bg-emerald-900 dark:bg-emerald-800 text-white font-extrabold'
                            : isSubtleRow
                            ? 'bg-emerald-50/60 dark:bg-emerald-950/25 font-bold text-slate-900 dark:text-white'
                            : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-200'
                        }
                      >
                        {row.cells.map((cell, cIdx) => {
                          const align = block.colAlign?.[cIdx] || 'left';
                          const isKeyCol = !block.headers && cIdx === 0;
                          return (
                            <td
                              key={cIdx}
                              className={`px-3.5 py-2.5 align-top ${
                                align === 'right'
                                  ? 'text-right font-mono tabular-nums whitespace-nowrap'
                                  : align === 'center'
                                  ? 'text-center'
                                  : 'text-left'
                              } ${
                                row.bold || isKeyCol
                                  ? isTotalRow
                                    ? 'font-extrabold text-white'
                                    : 'font-bold text-slate-900 dark:text-white'
                                  : ''
                              } ${isKeyCol ? 'w-44 sm:w-56 bg-slate-50/60 dark:bg-slate-800/30' : ''}`}
                            >
                              {cell}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    }
  };

  const renderEditBlock = (block: PlanningBlock, sectionIdx: number, blockIdx: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <div key={blockIdx} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Paragraf / Catatan
              </span>
              <button
                type="button"
                onClick={() =>
                  commitChange((draft) => {
                    draft.sections[sectionIdx].blocks.splice(blockIdx, 1);
                  })
                }
                className="text-[11px] text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Hapus Blok</span>
              </button>
            </div>
            <textarea
              rows={Math.max(2, Math.min(5, Math.ceil(block.text.length / 95)))}
              value={block.text}
              onChange={(e) =>
                commitChange((draft) => {
                  const target = draft.sections[sectionIdx].blocks[blockIdx];
                  if (target && target.type === 'paragraph') target.text = e.target.value;
                })
              }
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        );

      case 'subheading':
        return (
          <div key={blockIdx} className="flex items-center gap-2">
            <input
              type="text"
              value={block.text}
              onChange={(e) =>
                commitChange((draft) => {
                  const target = draft.sections[sectionIdx].blocks[blockIdx];
                  if (target && target.type === 'subheading') target.text = e.target.value;
                })
              }
              className="flex-1 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        );

      case 'callout':
        return (
          <div
            key={blockIdx}
            className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 space-y-2.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <input
                type="text"
                value={block.label || ''}
                placeholder="Label catatan (opsional)..."
                onChange={(e) =>
                  commitChange((draft) => {
                    const target = draft.sections[sectionIdx].blocks[blockIdx];
                    if (target && target.type === 'callout') target.label = e.target.value;
                  })
                }
                className="px-2.5 py-1 text-xs font-bold rounded-lg border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900 text-emerald-900 dark:text-emerald-300"
              />
              <button
                type="button"
                onClick={() =>
                  commitChange((draft) => {
                    draft.sections[sectionIdx].blocks.splice(blockIdx, 1);
                  })
                }
                className="text-[11px] text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Hapus Catatan</span>
              </button>
            </div>

            {(block.text !== '' || !block.bullets || block.bullets.length === 0) && (
              <textarea
                rows={2}
                value={block.text}
                placeholder="Isi keterangan..."
                onChange={(e) =>
                  commitChange((draft) => {
                    const target = draft.sections[sectionIdx].blocks[blockIdx];
                    if (target && target.type === 'callout') target.text = e.target.value;
                  })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            )}

            {block.bullets && (
              <div className="space-y-2">
                {block.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2">
                    <input
                      type="text"
                      value={b}
                      onChange={(e) =>
                        commitChange((draft) => {
                          const target = draft.sections[sectionIdx].blocks[blockIdx];
                          if (target && target.type === 'callout' && target.bullets) {
                            target.bullets[bIdx] = e.target.value;
                          }
                        })
                      }
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        commitChange((draft) => {
                          const target = draft.sections[sectionIdx].blocks[blockIdx];
                          if (target && target.type === 'callout' && target.bullets) {
                            target.bullets.splice(bIdx, 1);
                          }
                        })
                      }
                      className="p-1.5 text-red-500 hover:text-red-700 rounded-lg cursor-pointer"
                      title="Hapus poin"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    commitChange((draft) => {
                      const target = draft.sections[sectionIdx].blocks[blockIdx];
                      if (target && target.type === 'callout') {
                        if (!target.bullets) target.bullets = [];
                        target.bullets.push('Catatan baru...');
                      }
                    })
                  }
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 inline-flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Tambah Poin Catatan</span>
                </button>
              </div>
            )}
          </div>
        );

      case 'bullets':
        return (
          <div
            key={blockIdx}
            className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 space-y-2"
          >
            {block.items.map((item, itemIdx) => (
              <div key={itemIdx} className="flex flex-wrap sm:flex-nowrap items-start gap-2">
                {item.lead !== undefined && (
                  <input
                    type="text"
                    value={item.lead}
                    placeholder="Judul poin..."
                    onChange={(e) =>
                      commitChange((draft) => {
                        const target = draft.sections[sectionIdx].blocks[blockIdx];
                        if (target && target.type === 'bullets') {
                          target.items[itemIdx].lead = e.target.value;
                        }
                      })
                    }
                    className="w-full sm:w-44 px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                )}
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) =>
                    commitChange((draft) => {
                      const target = draft.sections[sectionIdx].blocks[blockIdx];
                      if (target && target.type === 'bullets') {
                        target.items[itemIdx].text = e.target.value;
                      }
                    })
                  }
                  className="flex-1 min-w-[200px] px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() =>
                    commitChange((draft) => {
                      const target = draft.sections[sectionIdx].blocks[blockIdx];
                      if (target && target.type === 'bullets') {
                        target.items.splice(itemIdx, 1);
                      }
                    })
                  }
                  className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                  title="Hapus item poin"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                commitChange((draft) => {
                  const target = draft.sections[sectionIdx].blocks[blockIdx];
                  if (target && target.type === 'bullets') {
                    const usesLead = target.items.some((i) => i.lead !== undefined);
                    target.items.push(
                      usesLead
                        ? { lead: 'Item baru.', text: 'Isi rincian perencanaan...' }
                        : { text: 'Poin perencanaan baru...' }
                    );
                  }
                })
              }
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Poin</span>
            </button>
          </div>
        );

      case 'table': {
        const colCount =
          block.headers?.length ||
          (() => {
            const firstDataRow = block.rows.find((r) => r.kind === 'row');
            return firstDataRow && firstDataRow.kind === 'row' ? firstDataRow.cells.length : 2;
          })();
        const hasGroups = block.rows.some((r) => r.kind === 'group');
        const budgetCapable = isBudgetTable(block);

        return (
          <div
            key={blockIdx}
            className="rounded-2xl border border-emerald-200 dark:border-emerald-800/70 overflow-hidden bg-white dark:bg-slate-900/60"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                {block.headers && block.headers.length > 0 && (
                  <thead>
                    <tr className="bg-emerald-800 dark:bg-emerald-900 text-white">
                      {block.headers.map((header, hIdx) => (
                        <th key={hIdx} className="px-3 py-2.5 font-bold whitespace-nowrap">
                          {header}
                        </th>
                      ))}
                      <th className="px-2 py-2.5 text-right w-12">Aksi</th>
                    </tr>
                  </thead>
                )}
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {block.rows.map((row, rIdx) => {
                    if (row.kind === 'group') {
                      return (
                        <tr key={rIdx} className="bg-emerald-50/90 dark:bg-emerald-950/50">
                          <td colSpan={colCount} className="px-2.5 py-2">
                            <input
                              type="text"
                              value={row.title}
                              onChange={(e) =>
                                commitChange((draft) => {
                                  const t = draft.sections[sectionIdx].blocks[blockIdx];
                                  if (t && t.type === 'table') {
                                    const targetRow = t.rows[rIdx];
                                    if (targetRow && targetRow.kind === 'group') {
                                      targetRow.title = e.target.value;
                                    }
                                  }
                                })
                              }
                              className="w-full px-2.5 py-1 text-xs font-bold rounded-lg border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900 text-emerald-900 dark:text-emerald-300"
                            />
                          </td>
                          <td className="px-2 py-2 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                commitChange((draft) => {
                                  const t = draft.sections[sectionIdx].blocks[blockIdx];
                                  if (t && t.type === 'table') t.rows.splice(rIdx, 1);
                                })
                              }
                              className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                              title="Hapus subjudul kelompok"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    }

                    if (row.kind === 'summary') {
                      return (
                        <tr
                          key={rIdx}
                          className={
                            row.highlight === 'total'
                              ? 'bg-emerald-900/15 dark:bg-emerald-900/40'
                              : 'bg-slate-50 dark:bg-slate-800/50'
                          }
                        >
                          <td colSpan={row.labelSpan} className="px-2.5 py-2">
                            <input
                              type="text"
                              value={row.label}
                              onChange={(e) =>
                                commitChange((draft) => {
                                  const t = draft.sections[sectionIdx].blocks[blockIdx];
                                  if (t && t.type === 'table') {
                                    const targetRow = t.rows[rIdx];
                                    if (targetRow && targetRow.kind === 'summary') {
                                      targetRow.label = e.target.value;
                                    }
                                  }
                                })
                              }
                              className="w-full px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                            />
                          </td>
                          <td className="px-2.5 py-2">
                            <input
                              type="text"
                              value={row.value}
                              onChange={(e) =>
                                commitChange((draft) => {
                                  const t = draft.sections[sectionIdx].blocks[blockIdx];
                                  if (t && t.type === 'table') {
                                    const targetRow = t.rows[rIdx];
                                    if (targetRow && targetRow.kind === 'summary') {
                                      targetRow.value = e.target.value;
                                    }
                                  }
                                })
                              }
                              className="w-full px-2.5 py-1 text-xs font-mono font-bold text-right rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                            />
                          </td>
                          <td className="px-2 py-2 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                commitChange((draft) => {
                                  const t = draft.sections[sectionIdx].blocks[blockIdx];
                                  if (t && t.type === 'table') t.rows.splice(rIdx, 1);
                                })
                              }
                              className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                              title="Hapus baris ringkasan"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={rIdx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                        {row.cells.map((cell, cIdx) => {
                          const align = block.colAlign?.[cIdx] || 'left';
                          const isNarrowNoCol =
                            block.headers?.[0]?.toLowerCase() === 'no' && cIdx === 0;
                          return (
                            <td
                              key={cIdx}
                              className={`px-2 py-2 align-top ${
                                isNarrowNoCol ? 'w-14' : 'min-w-[110px]'
                              }`}
                            >
                              <input
                                type="text"
                                value={cell}
                                onChange={(e) =>
                                  commitChange((draft) => {
                                    const t = draft.sections[sectionIdx].blocks[blockIdx];
                                    if (t && t.type === 'table') {
                                      const targetRow = t.rows[rIdx];
                                      if (targetRow && targetRow.kind === 'row') {
                                        targetRow.cells[cIdx] = e.target.value;
                                      }
                                    }
                                  })
                                }
                                className={`w-full px-2 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                                  align === 'right'
                                    ? 'text-right font-mono tabular-nums'
                                    : align === 'center'
                                    ? 'text-center'
                                    : 'text-left'
                                }`}
                              />
                            </td>
                          );
                        })}
                        <td className="px-2 py-2 text-right align-middle">
                          <button
                            type="button"
                            onClick={() =>
                              commitChange((draft) => {
                                const t = draft.sections[sectionIdx].blocks[blockIdx];
                                if (t && t.type === 'table') t.rows.splice(rIdx, 1);
                              })
                            }
                            className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                            title="Hapus baris"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Editor Actions */}
            <div className="px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    commitChange((draft) => {
                      const t = draft.sections[sectionIdx].blocks[blockIdx];
                      if (!t || t.type !== 'table') return;
                      const dataRows = t.rows.filter((r) => r.kind === 'row');
                      const nextNo = String(dataRows.length + 1);
                      const emptyCells = Array.from({ length: colCount }, (_, idx) => {
                        if (idx === 0 && t.headers?.[0]?.toLowerCase() === 'no') return nextNo;
                        if (budgetCapable && idx === 3) return 'Rp 0';
                        if (budgetCapable && idx === 4) return 'Rp 0';
                        return '';
                      });

                      // Insert before trailing summary rows so Subtotal/Total stays at the bottom
                      const firstTrailingSummaryIdx = t.rows.findIndex(
                        (r, i) =>
                          r.kind === 'summary' &&
                          t.rows.slice(i).every((tail) => tail.kind === 'summary')
                      );
                      if (firstTrailingSummaryIdx !== -1) {
                        t.rows.splice(firstTrailingSummaryIdx, 0, {
                          kind: 'row',
                          cells: emptyCells
                        });
                      } else {
                        t.rows.push({ kind: 'row', cells: emptyCells });
                      }
                    })
                  }
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Baris</span>
                </button>

                {hasGroups && (
                  <button
                    type="button"
                    onClick={() =>
                      commitChange((draft) => {
                        const t = draft.sections[sectionIdx].blocks[blockIdx];
                        if (!t || t.type !== 'table') return;
                        const firstTrailingSummaryIdx = t.rows.findIndex(
                          (r, i) =>
                            r.kind === 'summary' &&
                            t.rows.slice(i).every((tail) => tail.kind === 'summary')
                        );
                        const groupRow = { kind: 'group' as const, title: 'Kategori Baru' };
                        if (firstTrailingSummaryIdx !== -1) {
                          t.rows.splice(firstTrailingSummaryIdx, 0, groupRow);
                        } else {
                          t.rows.push(groupRow);
                        }
                      })
                    }
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Kategori</span>
                  </button>
                )}
              </div>

              {budgetCapable && (
                <button
                  type="button"
                  onClick={() => recalculateBudgetTable(sectionIdx, blockIdx)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Hitung Ulang Jumlah &amp; Total</span>
                </button>
              )}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Commodity Switcher & Mode Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={SCHOOL_LOGO_URL}
              alt="Logo SMKNPP 5 Konawe"
              referrerPolicy="no-referrer"
              className="w-10 h-10 object-contain shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <Sprout className="w-3.5 h-3.5" />
                <span>Panel Perencanaan Budidaya · {currentUser.name}</span>
              </div>
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                Orientasi, Perencanaan &amp; Anggaran per Komoditas
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Mode Switch: Baca vs Ubah Item vs File PDF Asli */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setDisplayMode('structured')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  displayMode === 'structured'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>Mode Baca</span>
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('edit')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  displayMode === 'edit'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Ubah Item Perencanaan</span>
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('pdf')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  displayMode === 'pdf'
                    ? 'bg-slate-900 dark:bg-slate-600 text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>PDF Asli</span>
              </button>
            </div>

            <a
              href={activeDoc.pdfUrl}
              download={activeDoc.pdfFilename}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh PDF</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenJobSheet(selectedCommodityId, 1)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Buka 7 Job Sheet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5 Commodity Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {COMMODITY_LIST.map((item) => {
            const isActive = item.id === selectedCommodityId;
            const plan = PLANNING_DOCUMENTS[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectCommodity(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 border cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                }`}
              >
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span>{plan.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Toast Banner */}
      {feedbackMsg && (
        <div className="px-4 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Customization Status & Reset Bar */}
      {(hasCustomEdits || displayMode === 'edit') && displayMode !== 'pdf' && (
        <div className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-700 dark:text-slate-300">
            {displayMode === 'edit' ? (
              <span>
                <strong className="text-emerald-700 dark:text-emerald-400">Mode Ubah Aktif:</strong>{' '}
                Silakan ubah rincian lahan, benih, pupuk, jadwal kegiatan, anggaran, atau catatan sesuai kebutuhan praktik Anda. Perubahan otomatis tersimpan untuk{' '}
                <strong>{currentUser.name}</strong>.
              </span>
            ) : (
              <span>
                <strong className="text-emerald-700 dark:text-emerald-400">Dokumen Disesuaikan:</strong>{' '}
                Menampilkan perencanaan yang telah diubah oleh <strong>{currentUser.name}</strong>.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {displayMode === 'edit' && (
              <button
                type="button"
                onClick={() => {
                  setDisplayMode('structured');
                  showToast(`Perencanaan ${activeDoc.shortLabel} tersimpan untuk ${currentUser.name}.`);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Selesai Mengubah</span>
              </button>
            )}

            {hasCustomEdits && !confirmReset && (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-red-400 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ke Asli</span>
              </button>
            )}

            {hasCustomEdits && confirmReset && (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-red-600 dark:text-red-400">
                  Kembalikan ke dokumen asli?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onResetCustomPlan(selectedCommodityId);
                    setConfirmReset(false);
                    showToast(`Perencanaan ${baseDoc.shortLabel} dikembalikan ke dokumen asli.`);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold cursor-pointer"
                >
                  Ya, Reset
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-semibold cursor-pointer"
                >
                  Batal
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mode 1 & 2: Structured Verbatim OR Editable Panel */}
      {displayMode !== 'pdf' ? (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Document Title Banner */}
          <div className="p-5 sm:p-8 border-b-2 border-emerald-700 bg-gradient-to-b from-emerald-50/60 to-white dark:from-emerald-950/25 dark:to-slate-900 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {hasCustomEdits
                  ? `Perencanaan Kustom · ${currentUser.name}`
                  : `Dokumen Perencanaan Asli · ${activeDoc.pageCount} Halaman PDF`}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {activeDoc.pdfFilename}
              </span>
            </div>

            {displayMode === 'edit' ? (
              <div className="space-y-2 pt-1">
                <input
                  type="text"
                  value={activeDoc.title}
                  onChange={(e) =>
                    commitChange((draft) => {
                      draft.title = e.target.value;
                    })
                  }
                  className="w-full px-3 py-2 text-lg sm:text-xl font-black rounded-xl border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-slate-900 text-emerald-900 dark:text-emerald-300"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={activeDoc.scientificOrSubtitle || ''}
                    placeholder="Subjudul / Nama Ilmiah..."
                    onChange={(e) =>
                      commitChange((draft) => {
                        draft.scientificOrSubtitle = e.target.value;
                      })
                    }
                    className="px-3 py-1.5 text-xs sm:text-sm italic rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
                  />
                  <input
                    type="text"
                    value={activeDoc.meta || ''}
                    placeholder="Keterangan tambahan (kelas / tanggal)..."
                    onChange={(e) =>
                      commitChange((draft) => {
                        draft.meta = e.target.value;
                      })
                    }
                    className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300"
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl sm:text-2xl font-black text-emerald-900 dark:text-emerald-300 tracking-tight">
                  {activeDoc.title}
                </h2>

                {activeDoc.scientificOrSubtitle && (
                  <p className="text-sm sm:text-base font-medium italic text-slate-700 dark:text-slate-200">
                    {activeDoc.scientificOrSubtitle}
                  </p>
                )}

                {activeDoc.meta && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {activeDoc.meta}
                  </p>
                )}
              </>
            )}

            {/* Quick Section Links */}
            <div className="pt-3 flex flex-wrap items-center gap-1.5">
              {activeDoc.sections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {sec.heading}
                </button>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="p-5 sm:p-8 space-y-8">
            {activeDoc.sections.map((section, sectionIdx) => (
              <section
                key={section.id}
                id={`plan-sec-${selectedCommodityId}-${section.id}`}
                className="space-y-3.5 scroll-mt-20"
              >
                {displayMode === 'edit' ? (
                  <input
                    type="text"
                    value={section.heading}
                    onChange={(e) =>
                      commitChange((draft) => {
                        draft.sections[sectionIdx].heading = e.target.value;
                      })
                    }
                    className="w-full px-3 py-1.5 text-base sm:text-lg font-extrabold text-emerald-800 dark:text-emerald-400 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20"
                  />
                ) : (
                  <h3 className="text-base sm:text-lg font-extrabold text-emerald-800 dark:text-emerald-400 pb-1.5 border-b border-emerald-200 dark:border-emerald-900">
                    {section.heading}
                  </h3>
                )}

                <div className="space-y-4">
                  {section.blocks.map((block, bIdx) =>
                    displayMode === 'edit'
                      ? renderEditBlock(block, sectionIdx, bIdx)
                      : renderReadBlock(block, bIdx)
                  )}
                </div>

                {displayMode === 'edit' && (
                  <div className="pt-1 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        commitChange((draft) => {
                          draft.sections[sectionIdx].blocks.push({
                            type: 'paragraph',
                            text: 'Catatan tambahan perencanaan siswa...'
                          });
                        })
                      }
                      className="px-3 py-1.5 rounded-xl text-[11px] font-semibold border border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Catatan di Bagian Ini</span>
                    </button>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      ) : (
        /* Mode 3: Original Attached PDF Viewer */
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Menampilkan file PDF asli: <span className="font-mono">{activeDoc.pdfFilename}</span>
            </div>
            <a
              href={activeDoc.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              Buka di Tab Baru
            </a>
          </div>
          <iframe
            src={activeDoc.pdfUrl}
            title={`PDF Perencanaan ${activeDoc.shortLabel}`}
            className="w-full h-[78vh] rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100"
          />
        </div>
      )}
    </div>
  );
};

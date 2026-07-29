import { useId, useState } from 'react';
import { DOCS, DOC_TABS, CONTACTS } from '../data/site.js';
import { NauticalMark } from '../components/Motifs.jsx';

/* Блок «Документы» (п. 7.4 ТЗ): вкладки «Основные» и «Отчёты»,
   под вкладками — аккордеон. Элемент списка: иконка типа файла,
   наименование, размер и иконка скачивания.
   Состояния: табы Active/Inactive, аккордеон Свёрнут/Развёрнут. */
export default function DocsTabs() {
    const [tab, setTab] = useState('main');
    const [open, setOpen] = useState(null);
    const uid = useId();

    const list = DOCS[tab] || [];

    const toggle = (i) => setOpen((cur) => (cur === i ? null : i));

    return (
        <section id="documents" className="section" style={{ background: 'var(--mist)', position: 'relative', overflow: 'hidden' }}>
            <NauticalMark type="documentsSeal" className="parus-docs-seal" />

            <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
                <span className="mono-caption">Документы</span>
                <h2 className="serif-h2" style={{ margin: '16px 0 0' }}>
                    Учредительные документы и отчётность
                </h2>
                <p style={{ margin: '16px 0 0', maxWidth: '54ch', font: '400 15.5px/1.6 var(--font-sans)', color: 'var(--tx-soft)' }}>
                    Как некоммерческая организация мы публикуем документы открыто. Нажмите на строку, чтобы прочитать,
                    что внутри, и скачать файл.
                </p>

                {/* Вкладки: Active / Inactive */}
                <div className="tabs" role="tablist" aria-label="Категории документов" style={{ marginTop: 'var(--s3)' }}>
                    {DOC_TABS.map((t) => (
                        <button
                            key={t.v}
                            type="button"
                            role="tab"
                            id={`${uid}-tab-${t.v}`}
                            aria-selected={tab === t.v}
                            aria-controls={`${uid}-panel-${t.v}`}
                            className="tab"
                            onClick={() => {
                                setTab(t.v);
                                setOpen(null);
                            }}
                        >
                            {t.label}
                            <span style={{ marginLeft: 8, opacity: 0.6, fontSize: 13 }}>{DOCS[t.v].length}</span>
                        </button>
                    ))}
                </div>

                {/* Аккордеон: Свёрнут / Развёрнут */}
                <div role="tabpanel" id={`${uid}-panel-${tab}`} aria-labelledby={`${uid}-tab-${tab}`} style={{ marginTop: 'var(--s2)' }}>
                    {list.map((d, i) => {
                        const expanded = open === i;
                        return (
                            <div className="acc-item" key={d.t}>
                                <button
                                    type="button"
                                    className="acc-head"
                                    aria-expanded={expanded}
                                    aria-controls={`${uid}-acc-${tab}-${i}`}
                                    onClick={() => toggle(i)}
                                >
                                    <span className="acc-icon" aria-hidden="true">
                                        <i className="ph-light ph-file-pdf"></i>
                                    </span>

                                    <span className="parus-doc-name">
                                        {d.t}
                                        <span>
                                            {d.type} · {d.size}
                                        </span>
                                    </span>

                                    <span className="acc-toggle" aria-hidden="true">
                                        <i className="ph-light ph-caret-down"></i>
                                    </span>
                                </button>

                                {expanded && (
                                    <div className="acc-panel" id={`${uid}-acc-${tab}-${i}`}>
                                        <p style={{ margin: '0 0 16px', maxWidth: '62ch', font: '400 15px/1.6 var(--font-sans)', color: 'var(--tx-soft)' }}>
                                            {d.d}
                                        </p>
                                        <a href={d.href} className="btn-line" download>
                                            <i className="ph-light ph-download-simple" aria-hidden="true" style={{ fontSize: 18 }}></i>
                                            Скачать {d.type}, {d.size}
                                        </a>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <p style={{ marginTop: 'var(--s3)', maxWidth: '68ch', font: '400 14px/1.6 var(--font-sans)', color: 'var(--tx-soft)' }}>
                    Нужны заверенные копии? Напишите на{' '}
                    <a href={`mailto:${CONTACTS.email}`} className="arrow-link">
                        {CONTACTS.email}
                    </a>{' '}
                    — отправим сканы в течение рабочего дня.
                </p>
            </div>

            <style>{`
                .parus-doc-name {
                    flex: 1;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    font: 500 16px/1.4 var(--font-sans);
                    color: var(--ink);
                    text-align: left;
                }
                .parus-doc-name span {
                    font: 400 13px/1.3 var(--font-mono);
                    letter-spacing: .03em;
                    color: var(--tx-mute);
                }
            `}</style>
        </section>
    );
}

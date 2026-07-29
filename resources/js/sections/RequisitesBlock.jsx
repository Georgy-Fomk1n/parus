import { REQUISITES, CONTACTS, BRANCHES } from '../data/site.js';

/* «Реквизиты» (п. 7.4 ТЗ): полное наименование организации, ИНН, ОГРН
   и юридический адрес. Мелкий, но читаемый шрифт, нижняя часть страницы
   перед подвалом. Незаполненные поля выводятся как «уточняется». */
export default function RequisitesBlock() {
    const rows = [
        { k: 'Полное наименование', v: REQUISITES.fullName },
        { k: 'Сокращённое наименование', v: REQUISITES.shortName },
        { k: 'ИНН', v: REQUISITES.inn },
        { k: 'ОГРН', v: REQUISITES.ogrn },
        { k: 'Юридический адрес', v: REQUISITES.legalAddress },
        { k: 'Фактические адреса', v: BRANCHES.map((b) => `${b.title}, ${b.city}`).join('; ') },
        { k: 'Телефон', v: CONTACTS.phone },
        { k: 'Электронная почта', v: CONTACTS.email },
    ];

    return (
        <section id="requisites" className="section" style={{ background: 'var(--paper-2)' }}>
            <div className="shell">
                <span className="mono-caption">Реквизиты организации</span>

                <dl className="parus-req">
                    {rows.map((r) => (
                        <div key={r.k}>
                            <dt>{r.k}</dt>
                            <dd data-empty={r.v ? 'false' : 'true'}>{r.v || REQUISITES.placeholder}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <style>{`
                .parus-req {
                    margin: var(--s2) 0 0;
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 0;
                    border-top: 1px solid var(--line);
                }
                .parus-req > div {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 4px;
                    padding: 12px 0;
                    border-bottom: 1px solid var(--line);
                }
                .parus-req dt {
                    font: 500 12.5px/1.4 var(--font-mono);
                    letter-spacing: .04em;
                    text-transform: uppercase;
                    color: var(--tx-mute);
                }
                .parus-req dd {
                    margin: 0;
                    font: 400 14.5px/1.5 var(--font-sans);
                    color: var(--tx);
                }
                .parus-req dd[data-empty="true"] {
                    font-style: italic;
                    color: var(--tx-mute);
                }
                @media (min-width: 720px) {
                    .parus-req > div {
                        grid-template-columns: 240px minmax(0, 1fr);
                        gap: 24px;
                        align-items: baseline;
                    }
                }
            `}</style>
        </section>
    );
}

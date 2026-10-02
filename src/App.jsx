import { useCallback, useMemo, useState } from 'react'
import Hero from './components/Hero'
import PlayerCard from './components/PlayerCard'
import PlayerModal from './components/PlayerModal'
import { players, roles, team } from './data/players'

export default function App() {
  const [role, setRole] = useState('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const close = useCallback(() => setSelected(null), [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return players.filter(
      (p) =>
        (role === 'All' || p.role === role) &&
        (!q || p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q)),
    )
  }, [role, query])

  const count = (r) => (r === 'All' ? players.length : players.filter((p) => p.role === r).length)

  return (
    <div className="grain min-h-screen overflow-x-hidden">
      <Hero />

      {/* Scrolling ticker */}
      <div className="relative -rotate-1 border-y border-black bg-gradient-to-r from-ember via-srh to-sun py-3 text-black">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl tracking-wider">
          {[...players, ...players].map((p, i) => (
            <span key={i} className="flex items-center gap-10">
              {p.name}
              <span aria-hidden>☀</span>
            </span>
          ))}
        </div>
      </div>

      <main id="squad" className="mx-auto max-w-7xl scroll-mt-6 px-4 py-20 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-srh">The squad</p>
            <h2 className="font-display text-6xl leading-none sm:text-7xl">
              Meet the <span className="text-sunrise">Orange Army</span>
            </h2>
          </div>
          <label className="relative block md:w-72">
            <span className="sr-only">Search players</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search player or country…"
              className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-white/35 focus:border-srh focus:bg-white/10"
            />
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">⌕</span>
          </label>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                role === r
                  ? 'bg-gradient-to-r from-sun to-srh text-black shadow-lg shadow-srh/40'
                  : 'border border-white/10 bg-white/5 text-white/70 hover:border-srh/60 hover:text-white'
              }`}
            >
              {r}
              <span className={`ml-2 text-xs ${role === r ? 'text-black/60' : 'text-white/35'}`}>{count(r)}</span>
            </button>
          ))}
        </div>

        {visible.length ? (
          <div key={role + query}>
            {[
              ['Playing XI', visible.filter((p) => !p.reserve)],
              ['Extra squad', visible.filter((p) => p.reserve)],
            ].map(
              ([title, group]) =>
                group.length > 0 && (
                  <section key={title} className="mt-12">
                    <div className="flex items-center gap-4">
                      <h3 className="font-display text-3xl tracking-wide text-gold">{title}</h3>
                      <span className="text-sm text-white/40">{group.length}</span>
                      <span className="h-px flex-1 bg-gradient-to-r from-srh/60 to-transparent" />
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {group.map((p, i) => (
                        <PlayerCard key={p.name} player={p} index={i} onOpen={setSelected} />
                      ))}
                    </div>
                  </section>
                ),
            )}
          </div>
        ) : (
          <p className="mt-16 text-center text-white/50">No players match “{query}”.</p>
        )}
      </main>

      {/* 2016 title banner */}
      <section className="relative isolate overflow-hidden border-t border-white/10">
        <img
          src={`${import.meta.env.BASE_URL}srh-champions-2016.jpg`}
          alt="Sunrisers Hyderabad squad celebrating with the IPL trophy in 2016"
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_35%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
        <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-4 pb-14 pt-40 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">Bengaluru · 29 May 2016</p>
          <h2 className="mt-2 font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.85]">
            <span className="text-sunrise">Champions</span>
            <br />
            2016
          </h2>
          <p className="mt-4 max-w-md text-white/75">
            The night the Orange Army lifted its first IPL trophy, beating RCB by 8 runs in the final.
          </p>
        </div>
      </section>

      {/* Records */}
      <section className="relative overflow-hidden border-t border-white/10 bg-coal">
        <span className="text-outline pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] leading-none">
          RISE
        </span>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-8 md:grid-cols-3">
          {team.records.map((r) => (
            <div key={r.value}>
              <p className="font-display text-7xl leading-none text-sunrise">{r.value}</p>
              <p className="mt-2 max-w-xs text-white/65">{r.label}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-white/40">
        <p>
          {team.home} · Head coach {team.coach} · Owned by {team.owner}
        </p>
        <p className="mt-1">Fan-made squad page. Not affiliated with Sunrisers Hyderabad or the IPL.</p>
      </footer>

      {selected && <PlayerModal player={selected} onClose={close} />}
    </div>
  )
}

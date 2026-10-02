import { team, players } from '../data/players'

const xi = players.filter((p) => !p.reserve)
const overseas = xi.filter((p) => p.country !== 'India').length

export default function Hero() {
  return (
    <header className="relative isolate overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_110%,#5a1a0a_0%,#1b0d0a_40%,var(--color-ink)_75%)]" />

      {/* Rotating sun rays + sun */}
      <div className="pointer-events-none absolute left-1/2 top-[62%] -z-10 aspect-square w-[160vmax] -translate-x-1/2 -translate-y-1/2">
        <div className="rays h-full w-full animate-spin-slow rounded-full" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[58%] -z-10 aspect-square w-[min(560px,90vw)] animate-glow rounded-full bg-[radial-gradient(circle,var(--color-gold)_0%,var(--color-sun)_30%,var(--color-ember)_58%,transparent_72%)] blur-[2px]" />

      {/* Horizon */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[34%] bg-gradient-to-b from-transparent via-ink/90 to-ink" />
      <div className="absolute inset-x-0 bottom-[34%] -z-10 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold via-sun to-ember font-display text-xl text-black shadow-lg shadow-srh/40">
            {team.short}
          </span>
          <span className="font-display text-2xl tracking-wider">Orange Army</span>
        </div>
        <a
          href="#squad"
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold backdrop-blur transition hover:border-srh hover:bg-srh hover:text-black"
        >
          View squad
        </a>
      </nav>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 text-center sm:px-8 sm:pb-36 sm:pt-20">
        <p className="animate-rise text-xs font-semibold uppercase tracking-[0.4em] text-gold/90 sm:text-sm">
          {team.tagline}
        </p>
        <h1
          className="animate-rise font-display text-[clamp(4rem,15vw,12rem)] leading-[0.85] [animation-delay:120ms]"
        >
          <span className="block text-sunrise drop-shadow-[0_8px_40px_rgb(242_101_34/0.5)]">Sunrisers</span>
          <span className="block text-white">Hyderabad</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl animate-rise text-base text-white/70 [animation-delay:240ms] sm:text-lg">
          IPL champions in {team.titles.join(', ')}. Home of the 287, a Cummins-led dream XI and the loudest
          stands in Hyderabad.
        </p>

        <dl className="mx-auto mt-12 grid max-w-3xl animate-rise grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur [animation-delay:360ms] sm:grid-cols-4">
          {[
            ['Title', team.titles[0]],
            ['Finals', team.finals.length],
            ['Squad', players.length],
            ['Overseas XI', overseas],
          ].map(([label, value]) => (
            <div key={label} className="bg-ink/70 px-4 py-5">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50">{label}</dt>
              <dd className="mt-1 font-display text-4xl text-sunrise">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  )
}

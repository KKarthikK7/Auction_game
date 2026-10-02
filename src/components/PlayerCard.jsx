import { useRef, useState } from 'react'

export const roleStyles = {
  Batter: 'from-gold to-sun',
  Wicketkeeper: 'from-sun to-srh',
  'All-rounder': 'from-srh to-ember',
  Bowler: 'from-ember to-[#8f1d0c]',
}

export function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
}

export default function PlayerCard({ player, index, onOpen }) {
  const ref = useRef(null)
  const [photoFailed, setPhotoFailed] = useState(false)
  const showPhoto = player.image && !photoFailed

  // 3D tilt + spotlight that follows the cursor
  function handleMove(e) {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 12}deg) translateY(-4px)`
  }

  function handleLeave() {
    ref.current.style.transform = ''
  }

  const overseas = player.country !== 'India'

  // Entry animation lives on the wrapper so it doesn't fight the inline tilt transform
  return (
    <div className="animate-rise" style={{ animationDelay: `${index * 60}ms` }}>
    <button
      ref={ref}
      type="button"
      onClick={() => onOpen(player)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="card group relative flex h-full w-full flex-col overflow-hidden rounded-3xl text-left outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {/* Portrait panel */}
      <div className="relative h-56 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${roleStyles[player.role]} opacity-90 transition-transform duration-700 group-hover:scale-110`}
        />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgb(0_0_0/0.12)_0_2px,transparent_2px_14px)]" />
        <div className="absolute -bottom-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/60 blur-3xl" />

        <span className="absolute -right-3 -top-6 select-none font-display text-[11rem] leading-none text-black/15">
          {initials(player.name)}
        </span>

        {showPhoto ? (
          <img
            src={player.image}
            alt={player.name}
            loading="lazy"
            onError={() => setPhotoFailed(true)}
            className="absolute bottom-0 left-1/2 h-[94%] -translate-x-1/2 object-contain object-bottom drop-shadow-[0_10px_25px_rgb(0_0_0/0.45)] transition-transform duration-500 [mask-image:linear-gradient(to_bottom,#000_75%,transparent)] group-hover:scale-105"
          />
        ) : (
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-28 w-28 place-items-center rounded-full border-4 border-black/20 bg-ink/85 font-display text-5xl text-sunrise shadow-2xl shadow-black/50 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
            {initials(player.name)}
          </span>
        </div>
        )}

        <div className="absolute left-4 top-4 flex gap-2">
          {player.captain && (
            <span className="rounded-full bg-black px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-gold">
              Captain
            </span>
          )}
          {overseas && (
            <span title="Overseas player" className="rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
              ✈ OS
            </span>
          )}
        </div>
        <span className="absolute right-4 top-4 text-2xl drop-shadow" aria-label={player.country}>
          {player.flag}
        </span>
      </div>

      {/* Info */}
      <div className="relative flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-srh">{player.role}</p>
        <h3 className="mt-1 font-display text-3xl leading-none tracking-wide">{player.name}</h3>
        <p className="mt-2 text-sm text-white/55">
          {player.batting} bat{player.bowling !== '—' && <> · {player.bowling}</>}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {player.traits.slice(0, 2).map((t) => (
            <li key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75">
              {t}
            </li>
          ))}
        </ul>

        <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-gold opacity-70 transition group-hover:opacity-100">
          View profile
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </button>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { roleStyles, initials } from './PlayerCard'

export default function PlayerModal({ player, onClose }) {
  const [photoFailed, setPhotoFailed] = useState(false)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const rows = [
    ['Country', `${player.flag}  ${player.country}`],
    ['Role', player.role],
    ['Batting', player.batting],
    ['Bowling', player.bowling],
  ]

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={player.name}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid w-full max-w-3xl animate-pop overflow-hidden rounded-3xl border border-white/10 bg-coal shadow-2xl shadow-srh/30 md:grid-cols-[1fr_1.3fr]"
      >
        <div className={`relative min-h-72 overflow-hidden bg-gradient-to-br ${roleStyles[player.role]}`}>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgb(0_0_0/0.12)_0_2px,transparent_2px_14px)]" />
          <span
            className={`absolute inset-0 grid select-none place-items-center font-display text-[10rem] leading-none md:text-[13rem] ${
              player.image && !photoFailed ? 'text-black/15' : 'text-black/80'
            }`}
          >
            {initials(player.name)}
          </span>
          {player.image && !photoFailed && (
            <img
              src={player.image}
              alt={player.name}
              onError={() => setPhotoFailed(true)}
              className="absolute bottom-0 left-1/2 h-[92%] max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_15px_35px_rgb(0_0_0/0.5)] [mask-image:linear-gradient(to_bottom,#000_80%,transparent)]"
            />
          )}
          {player.captain && (
            <span className="absolute bottom-4 left-4 rounded-full bg-black px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-gold">
              Captain
            </span>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-srh">Sunrisers Hyderabad</p>
          <h2 className="mt-1 font-display text-5xl leading-none sm:text-6xl">{player.name}</h2>

          <p className="mt-5 border-l-2 border-srh pl-4 text-white/80">{player.highlight}</p>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            {rows.map(([k, v]) => (
              <div key={k} className="rounded-xl bg-white/5 px-4 py-3">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">{k}</dt>
                <dd className="mt-0.5 text-sm font-semibold">{v}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-5 flex flex-wrap gap-2">
            {player.traits.map((t) => (
              <li key={t} className="rounded-full bg-gradient-to-r from-srh/25 to-ember/25 px-3 py-1 text-xs font-semibold text-gold">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-lg text-white backdrop-blur transition hover:rotate-90 hover:bg-srh hover:text-black"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

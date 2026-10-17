import { useEffect, useRef } from 'react'
import Icon from '@/components/ui/Icon'

/** Full-size picture viewer built on the native <dialog> (Esc closes it, focus is trapped). */
export default function Lightbox({ item, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (item && !dialog.open) dialog.showModal()
    if (!item && dialog.open) dialog.close()
  }, [item])

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Enlarged picture"
      onClose={onClose}
      onClick={(event) => {
        // A click on the dark area around the picture closes it.
        if (event.target === dialogRef.current) onClose()
      }}
    >
      <figure className="lightbox-inner">
        <button className="round-btn lightbox-close" type="button" aria-label="Close picture" onClick={onClose}>
          <Icon name="close" size={22} />
        </button>
        {item && <img src={item.src} alt={item.alt} />}
        <figcaption>{item?.caption}</figcaption>
      </figure>
    </dialog>
  )
}

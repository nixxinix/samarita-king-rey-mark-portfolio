import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { site } from '@/data/site'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <Reveal as="h1">Hey, I&apos;m {site.name}</Reveal>
        <Reveal as="p">{site.intro}</Reveal>
        <Reveal className="hero-action">
          <Button to="/contact">Contact me</Button>
        </Reveal>
      </div>
    </section>
  )
}

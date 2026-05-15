import { Container } from '@/components/primitives/Container'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center">
      <Container>
        <p className="eyebrow">404</p>
        <h1 className="text-h1 mt-6 max-w-[20ch]">
          This page hasn&apos;t been engineered yet.
        </h1>
        <a
          href="/"
          className="mt-12 inline-block font-mono text-[0.8125rem] uppercase tracking-[0.15em] underline decoration-1 underline-offset-[0.3em]"
        >
          ← Back home
        </a>
      </Container>
    </section>
  )
}

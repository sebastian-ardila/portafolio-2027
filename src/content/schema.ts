import { z } from 'zod'

export const HeroSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  subtitleTemplate: z.string(),
  ctaPrimary: z.object({ label: z.string(), href: z.string() }),
  ctaSecondary: z.object({ label: z.string(), href: z.string() }),
  metaLine: z.string(),
})

export const KaizenPillarSchema = z.object({
  number: z.string(),
  title: z.string(),
  description: z.string(),
})

export const KaizenSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  pillars: z.array(KaizenPillarSchema),
  ctaPrimary: z
    .object({ label: z.string(), href: z.string() })
    .optional(),
  ctaSecondary: z
    .object({ label: z.string(), href: z.string() })
    .optional(),
})

export const SelectiveRowSchema = z.object({
  forYou: z.string(),
  notForYou: z.string(),
})

export const SelectiveSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  headers: z.object({ left: z.string(), right: z.string() }),
  rows: z.array(SelectiveRowSchema),
})

export const ServiceSchema = z.object({
  number: z.string(),
  title: z.string(),
  description: z.string(),
  stack: z.array(z.string()).optional(),
})

export const ServicesSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  items: z.array(ServiceSchema),
})

export const ProjectSchema = z.object({
  number: z.string(),
  name: z.string(),
  role: z.string(),
  summary: z.string(),
  stack: z.array(z.string()),
  url: z.string().optional(),
  domain: z.string().optional(),
  year: z.string().optional(),
  art: z.string().optional(),
  repo: z.string().optional(),
  /** Local favicon path (preferred over Google s2 fallback if present). */
  iconSrc: z.string().optional(),
})

export const WorkSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  items: z.array(ProjectSchema),
  viewAllLabel: z.string(),
  viewAllHref: z.string(),
  archiveTeaser: z.string(),
})

export const PhilosophySchema = z.object({
  eyebrow: z.string(),
  paragraphs: z.array(z.string()),
  signature: z.string(),
})

export const ContactSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string(),
  callLabel: z.string(),
  callHref: z.string(),
})

export const AboutSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  paragraphs: z.array(z.string()),
  caption: z.string(),
})

export const HomeContentSchema = z.object({
  hero: HeroSchema,
  about: AboutSchema,
  kaizen: KaizenSchema,
  selective: SelectiveSchema,
  services: ServicesSchema,
  work: WorkSchema,
  philosophy: PhilosophySchema,
  contact: ContactSchema,
})

export type HomeContent = z.infer<typeof HomeContentSchema>
export type Hero = z.infer<typeof HeroSchema>
export type Kaizen = z.infer<typeof KaizenSchema>
export type Selective = z.infer<typeof SelectiveSchema>
export type Services = z.infer<typeof ServicesSchema>
export type Work = z.infer<typeof WorkSchema>
export type Project = z.infer<typeof ProjectSchema>
export type Philosophy = z.infer<typeof PhilosophySchema>
export type Contact = z.infer<typeof ContactSchema>
export type About = z.infer<typeof AboutSchema>

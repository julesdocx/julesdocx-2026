import type {PortableTextBlock} from '@portabletext/types'
import type {ImageAsset, Slug} from '@sanity/types'
import groq from 'groq'

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]`

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`


export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  date: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
  tags?: string[]
  gallery?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    _key?: string
    _type: 'image'
    alt?: string
  }[]
}
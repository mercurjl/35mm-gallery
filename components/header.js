import Link from 'next/link'

export default function Header() {
  return (
    <div className='p-8 text-white bg-black inline-flex'>
      <Link href={'/'}>
        <a>
          <h1 className="text-2xl font-bold mt-12">
            35mm.gallery
          </h1>
        </a>
      </Link>
    </div>
  )
}

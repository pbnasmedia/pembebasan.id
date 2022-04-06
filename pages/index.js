import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { getAllPosts } from '@/lib/notion'
import BLOG from '@/blog.config'

export async function getStaticProps () {
  const posts = await getAllPosts({ includePages: false })
  const postsToShow = posts.slice(0, BLOG.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > BLOG.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

const blog = ({ postsToShow, page, showNext }) => {
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      <h1 className="font-bold text-3xl text-black dark:text-white mb-2">PEMBEBASAN.ORG</h1>
      <div className="md:block leading-8 mb-8 text-gray-700 dark:text-gray-300">
        <p>PEMBEBASAN.ORG merupakan situs web yang dikelola oleh Pusat Perjuangan Mahasiswa untuk Pembebasan Nasional (PEMBEBASAN), organisasi mahasiswa berkarakter kerakyatan, demokratis, feminis dan ekologis.</p>
      </div>
      {postsToShow.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}

export default blog

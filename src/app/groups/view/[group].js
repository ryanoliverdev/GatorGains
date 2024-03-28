import { prisma } from '@/lib/prisma';
import { useRouter } from 'next/router';

const Post = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.name}</h1>
      <p>{post.description}</p>
    </div>
  );
};

export async function getServerSideProps({ id }) {

  // Fetch data for the specific post using slug
  const post = prisma.group.findUnique({
    where: {
      id: id,
    },
  });

  return {
    props: { post },
  };
}

export default Post;
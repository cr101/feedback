import { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, usePaginatedQuery, useRouter, useParam, BlitzPage } from "blitz";
import getComments from "app/comments/queries/getComments";

const ITEMS_PER_PAGE = 100;

export const CommentsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const fileId = useParam("fileId", "number");
  const [{ comments, hasMore }] = usePaginatedQuery(getComments, {
    where: { file: { id: fileId } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Link href={`/files/${fileId}/comments/${comment.id}`}>
              <a>{comment.body}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const CommentsPage: BlitzPage = () => {
  const fileId = useParam("fileId", "number");

  return (
    <div>
      <p>
        <Link href={`/files/${fileId}/comments/new`}>
          <a>Create Comment</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <CommentsList />
      </Suspense>
    </div>
  );
};

CommentsPage.getLayout = (page) => <Layout title={"Comments"}>{page}</Layout>;

export default CommentsPage;

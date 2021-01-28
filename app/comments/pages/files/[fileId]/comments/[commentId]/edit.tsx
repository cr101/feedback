import { Suspense } from "react";
import Layout from "app/layouts/Layout";
import {
  Link,
  useRouter,
  useQuery,
  useMutation,
  useParam,
  BlitzPage,
} from "blitz";
import getComment from "app/comments/queries/getComment";
import updateComment from "app/comments/mutations/updateComment";
import CommentForm from "app/comments/components/CommentForm";

export const EditComment = () => {
  const router = useRouter();
  const commentId = useParam("commentId", "number");
  const fileId = useParam("fileId", "number") as number;
  const [comment, { setQueryData }] = useQuery(getComment, {
    where: { id: commentId },
  });
  const [updateCommentMutation] = useMutation(updateComment);

  return (
    <div>
      <h1>Edit Comment {comment.id}</h1>
      <pre>{JSON.stringify(comment)}</pre>

      <CommentForm
        initialValues={comment}
        onSubmit={async () => {
          try {
            const updated = await updateCommentMutation({
              where: { id: comment.id },
              data: { body: "MyNewName" },
              fileId,
            });
            await setQueryData(updated);
            alert("Success!" + JSON.stringify(updated));
            router.push(`/files/${fileId}/comments/${updated.id}`);
          } catch (error) {
            console.log(error);
            alert("Error editing comment " + JSON.stringify(error, null, 2));
          }
        }}
      />
    </div>
  );
};

const EditCommentPage: BlitzPage = () => {
  const fileId = useParam("fileId", "number");

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditComment />
      </Suspense>

      <p>
        <Link href={`/files/${fileId}/comments`}>
          <a>Comments</a>
        </Link>
      </p>
    </div>
  );
};

EditCommentPage.getLayout = (page) => (
  <Layout title={"Edit Comment"}>{page}</Layout>
);

export default EditCommentPage;

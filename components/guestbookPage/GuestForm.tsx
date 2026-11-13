"use client";

import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineSwapRight } from "react-icons/ai";
import guestBookOperations from "@/lib/graphql/guestBook";
import { isHygraphConfigured } from "@/lib/config";

const GUEST_NAME_KEY = "portfolio_guestName";

interface Inputs {
  name: string;
  comment: string;
}

interface CreateComment {
  createGuestBook: {
    id: string;
    name: string;
    comment: string;
    createdAt: string;
  };
}

export default function GuestForm() {
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // localStorage only exists in the browser, so read the saved name after mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(GUEST_NAME_KEY);
      if (saved) setValue("name", saved);
    } catch {
      // storage unavailable (private mode etc.) — just start empty
    }
  }, [setValue]);

  const [createComment, { loading }] = useMutation<CreateComment, Inputs>(
    guestBookOperations.Mutations.createComment,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            guestBooksConnection(oldValue) {
              const newCommentRef = cache.writeFragment({
                data: data?.createGuestBook,
                fragment: gql`
                  fragment NewGuestBook on GuestBook {
                    id
                    name
                    comment
                    createdAt
                  }
                `,
              });
              return {
                ...oldValue,
                edges: [{ node: newCommentRef }, ...oldValue.edges],
              };
            },
          },
        });
      },
      onCompleted({ createGuestBook }) {
        toast.success(`Thanks for your comment`, {
          duration: 5000,
        });
        reset({ comment: "", name: createGuestBook.name });
        if (isChecked) {
          try {
            localStorage.setItem(GUEST_NAME_KEY, createGuestBook.name);
          } catch {
            // ignore storage errors
          }
        }
        setIsChecked(false);
      },
      onError() {
        toast.error("Server error. Try again later");
      },
    }
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!isHygraphConfigured) {
      toast.error("The guest book is not available right now.");
      return;
    }
    createComment({ variables: data });
  };

  const onInvalid = () => toast.error("Please enter both a comment and your name.");

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <textarea
        {...register("comment", { required: true })}
        placeholder="Comment"
        className="h-32 mb-4 formStyle"
      ></textarea>
      <input
        {...register("name", { required: true })}
        type="text"
        placeholder="Name"
        className="h-20 formStyle"
      />
      <fieldset className="flex items-center gap-4 mt-6 mb-8">
        <input
          disabled={loading}
          id="reminder"
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
        <label htmlFor="reminder" className="text-xl font-medium text-gray-600">
          Save my name for the next time I come.
        </label>
      </fieldset>
      <fieldset className="w-[22rem] h-20 bg-[#0e1422d9] flex justify-center items-center gap-3 text-gray-300 group mt-6 rounded-lg cursor-pointer">
        <button
          type="submit"
          className={`${
            loading ? "pointer-events-none" : "group-hover:text-main-orange"
          } uppercase text-2xl font-semibold group-hover:mx-2 transition-all duration-300`}
        >
          {loading ? "submitting..." : "submit"}
        </button>

        <AiOutlineSwapRight
          className={`text-4xl group-hover:text-main-orange transition-all duration-300 ${
            loading ? "hidden" : "block"
          }`}
        />
      </fieldset>
    </form>
  );
}

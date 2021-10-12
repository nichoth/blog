import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { useWebnative } from "../context/webnative";

type Inputs = {
  title: string;
  content: string;
};

const Editor = ({ feed }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { fs } = useWebnative()

  console.log('fs', fs)
  console.log('feed in editor', feed)

  const onSubmit = handleSubmit((data) => {
    console.log('submit', data)
    feed.addItem({
      id: '1',
      authors: [{ name: 'alice'}],
      content_text: data.content,
      title: data.title,
      tags: ['b']
    })
  });

  return (
    <Layout>
      <header className="flex">
        <h1 className="text-xl flex-grow">New Post</h1>
      </header>
      <section className="w-full py-8">
        <form onSubmit={onSubmit}>
          <label className="block">
            Title
            <input
              type="text"
              className="form-input"
              {...register("title", { required: true })}
            />
          </label>
          <label className="block mt-6">
            Body
            <textarea
              rows={20}
              className="form-textarea"
              {...register("content")}
            ></textarea>
          </label>
          <div>
            <button className="btn">Publish</button>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default Editor;

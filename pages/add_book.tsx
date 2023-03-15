import React, { useState } from "react";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import Router from "next/router";

const AddBook: React.FC = () => {
  const [title, setTitle] = useState("");
  const [authorLastName, setAuthorLastName] = useState("");
  const [authorFirstName, setAuthorFirstName] = useState("");
  const [genreName, setGenreName] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, authorLastName, authorFirstName, genreName };
      await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/add_book");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <h1>Add Book</h1>
      <form onSubmit={submitData}>
        <label htmlFor="title">Title</label>
        <input
          autoFocus
          required
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
        />
        <label htmlFor="authorLastName">Last Name</label>
        <input
          required
          onChange={(e) => setAuthorLastName(e.target.value)}
          placeholder="Author Last Name"
          type="text"
          value={authorLastName}
        />
        <label htmlFor="authorFirstName">First Name</label>
        <input
          required
          onChange={(e) => setAuthorFirstName(e.target.value)}
          placeholder="Author First Name"
          type="text"
          value={authorFirstName}
        />
        <label htmlFor="genre">Genre</label>
        <input
          required
          onChange={(e) => setGenreName(e.target.value)}
          placeholder="Genre"
          type="text"
          value={genreName}
        />
        <input
          type="submit"
          disabled={!title || !authorLastName || !authorFirstName || !genreName}
          value="Add Book"
        />
      </form>
      <style jsx>{`
        label {
          margin-left: 1rem;
          font-weight: bold;
        }
        input {
          margin-left: 0.5rem;
        }
      `}</style>
    </Layout>
  );
};

export default AddBook;
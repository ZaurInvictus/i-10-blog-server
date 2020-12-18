exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("posts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("posts").insert([{
          post: "Lorem ipsum 1",
          comment: "comment to the post 1"
        },
        {
          post: "Lorem ipsum 2",
          comment: "comment to the post 2"
        },
      ]);
    });
};
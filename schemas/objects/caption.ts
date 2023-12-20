import { defineArrayMember, defineType } from "sanity"

export default defineType({
  title: "Caption",
  name: "caption",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ["https", "http", "mailto", "tel"],
                  }),
              }
            ]
          }
        ]
      }
    }, {strict: false }),
  ]
})

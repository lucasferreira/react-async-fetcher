const Samples = [
  {
    name: "Simple Fetch",
    link: "/docs/examples/SimpleFetch.js",
    component: require("./SimpleFetch").default,
    sourceCode: require("!!raw-loader!./SimpleFetch"),
  },
  {
    name: "Manual Fetch",
    link: "/docs/examples/ManualFetch.js",
    component: require("./ManualFetch").default,
    sourceCode: require("!!raw-loader!./ManualFetch"),
  },
  {
    name: "Custom Query",
    link: "/docs/examples/CustomQuery.js",
    component: require("./CustomQuery").default,
    sourceCode: require("!!raw-loader!./CustomQuery"),
  },
  {
    name: "Auto Complete",
    link: "/docs/examples/AutoComplete.js",
    component: require("./AutoComplete").default,
    sourceCode: require("!!raw-loader!./AutoComplete"),
  },
  {
    name: "Simple POST",
    link: "/docs/examples/SimplePost.js",
    component: require("./SimplePost").default,
    sourceCode: require("!!raw-loader!./SimplePost"),
  },
  {
    name: "Formik Sample",
    link: "/docs/examples/FormikSample.js",
    component: require("./FormikSample").default,
    sourceCode: require("!!raw-loader!./FormikSample"),
  },
  {
    name: "Formik Sample (2)",
    link: "/docs/examples/FormikSample2.js",
    component: require("./FormikSample2").default,
    sourceCode: require("!!raw-loader!./FormikSample2"),
  },
  {
    name: "Formik Sample (3)",
    link: "/docs/examples/FormikSample3.js",
    component: require("./FormikSample3").default,
    sourceCode: require("!!raw-loader!./FormikSample3"),
  },
  {
    name: "Form Upload",
    link: "/docs/examples/FormUpload.js",
    component: require("./FormUpload").default,
    sourceCode: require("!!raw-loader!./FormUpload"),
  },
];

export default Samples.map(sample => ({
  ...sample,
  key: sample.name
    .replace(/[()\[\]\#]/gi, "")
    .replace(/[ \/\\_]/gi, "-")
    .toLowerCase(),
}));

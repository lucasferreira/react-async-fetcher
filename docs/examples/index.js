const Samples = [
  {
    name: "Simple Fetch",
    link: "/docs/examples/SimpleFetch.js",
    component: require("../examples/SimpleFetch").default,
    sourceCode: require("!!raw-loader!../examples/SimpleFetch"),
  },
  {
    name: "Manual Fetch",
    link: "/docs/examples/ManualFetch.js",
    component: require("../examples/ManualFetch").default,
    sourceCode: require("!!raw-loader!../examples/ManualFetch"),
  },
  {
    name: "Custom Query",
    link: "/docs/examples/CustomQuery.js",
    component: require("../examples/CustomQuery").default,
    sourceCode: require("!!raw-loader!../examples/CustomQuery"),
  },
  {
    name: "Auto Complete",
    link: "/docs/examples/AutoComplete.js",
    component: require("../examples/AutoComplete").default,
    sourceCode: require("!!raw-loader!../examples/AutoComplete"),
  },
  {
    name: "Simple POST",
    link: "/docs/examples/SimplePost.js",
    component: require("../examples/SimplePost").default,
    sourceCode: require("!!raw-loader!../examples/SimplePost"),
  },
  {
    name: "Formik Sample",
    link: "/docs/examples/FormikSample.js",
    component: require("../examples/FormikSample").default,
    sourceCode: require("!!raw-loader!../examples/FormikSample"),
  },
  {
    name: "Formik Sample (2)",
    link: "/docs/examples/FormikSample2.js",
    component: require("../examples/FormikSample2").default,
    sourceCode: require("!!raw-loader!../examples/FormikSample2"),
  },
  {
    name: "Formik Sample (3)",
    link: "/docs/examples/FormikSample3.js",
    component: require("../examples/FormikSample3").default,
    sourceCode: require("!!raw-loader!../examples/FormikSample3"),
  },
  {
    name: "Form Upload",
    link: "/docs/examples/FormUpload.js",
    component: require("../examples/FormUpload").default,
    sourceCode: require("!!raw-loader!../examples/FormUpload"),
  },
];

export default Samples.map(sample => ({
  ...sample,
  key: sample.name
    .replace(/[()\[\]\#]/gi, "")
    .replace(/[ \/\\_]/gi, "-")
    .toLowerCase(),
}));

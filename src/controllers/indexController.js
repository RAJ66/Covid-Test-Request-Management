module.exports = {
  async upload(req, res) {
    console.log("upload route");
    res.render("index", { title: "Express" });
  },
  async page(req, res) {
    res.render("index", { title: "Express" });
  },
};

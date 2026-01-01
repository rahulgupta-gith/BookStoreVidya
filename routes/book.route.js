const router = require("express").Router();
const { addBook, getBooks, viewBook, myBooks, editBook, postEditBook, deleteBook, getAddBook} = require("../controllers/book.controller");
const { protect } = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", getBooks);
router.get("/add", protect, getAddBook);
router.post("/add", upload.single("image"), addBook);

router.get("/my-books", protect, myBooks);
router.get("/edit/:id", editBook);
router.post("/edit/:id", postEditBook);
router.get("/:id", viewBook);
router.delete("/:id", deleteBook);

module.exports = router;

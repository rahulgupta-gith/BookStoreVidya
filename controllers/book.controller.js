const Book = require("../models/Book");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.getBooks = async (req, res) => {
  try {
    const {category, isFree} = req.query;
    let query = {};

    if(isFree === 'true'){
      query = {isFree: true};
    } else if (category) {
      query.category = category;
    }

    const books = await Book.find(query).lean();
    // const books = await Book.find();
    res.render("books/list",{
      books,
      activeFilter: isFree === 'true' ? 'free' : category || 'all',
    }
    );
  
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.viewBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    .populate("uploadedBy", "name address");
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.render("books/view", { book });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.addBook = async (req, res) => {
  try {
    let imageUrl = null;
    let {title, category, price, description, isFree} = req.body; 
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "books"
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path); 
    }

    await Book.create({
      title: title,
      category: category,
      description: description,
      uploadedBy: req.user._id,
      price: price,
      isFree: isFree === "true",
      image: imageUrl
    });

     return res.redirect("/books/my-books");
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.listBooks = async (req, res) => {
  const books = await Book.find({ approvedByAdmin: true });
  res.render("books/list", { books });
};

exports.editBook = async(req,res)=>{
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.redirect("/books/my-books");
    }

    res.render("books/edit", { book });
  } catch (error) {
    console.error(error);
    res.redirect("/books/my-books");
  }
}

exports.postEditBook = async(req,res)=>{
   try {
    const {
      title,
      category,
      price,
      isFree,
      condition,
      description
    } = req.body;

    await Book.findByIdAndUpdate(req.params.id, {
      title,
      category,
      price: isFree ? 0 : price,
      isFree: isFree === "on",
      condition,
      description
    });

    res.redirect("/books/my-books");
  } catch (error) {
    console.error(error);
    res.redirect("/books/my-books");
  }
}
// GET /books/my-books
exports.myBooks = async (req, res) => {
  try{
    const books = await Book.find({ uploadedBy: req.user._id })
    .sort({ createdAt: -1 });

    res.render("books/my-books", {
    books,
    user: req.user
  });
  }catch(error){
    console.log(error);
    res.redirect("/books");
  }
  
};

exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;

    const book = await Book.findById(id);
    if (!book) {
      return res.redirect("/books/my-books");
    }

    await Book.findByIdAndDelete(id);

    // ✅ Redirect back to My Books
    return res.redirect("/books/my-books");

  } catch (error) {
    console.error(error);
    return res.redirect("/books/my-books");
  }
};




exports.getAddBook = async(req,res)=>{
  res.render("books/add")
}
import { useState } from "react";
import IMAGES from "./images/logo.jpg";
import IMAGES2 from "./images/search.svg";
import IMAGES3 from "./images/bg.jpg";
// import "./App.css";
// aplikasi todolist dengan tema be a front end developer
function ToDo() {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [showCompleted, setShowCompleted] = useState();
  const [showNotCompleted, setShowNotCompleted] = useState();
  const [showAll, setShowAll] = useState();

  // fungsi add item
  const addItem = (newItem) => {
    const isDuplicate = items.find(
      (item) =>
        item.name.trim().toLowerCase() === newItem.name.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert("Nama tidak boleh sama");
      return;
    } else if (!newItem.name) {
      alert("masukkan sesuatu");
    } else if (!newItem.title) {
      alert("masukkan gambar");
      return;
    } else if (newItem.name.trim() === "") {
      alert("masukkan sesuatuu");
      return;
    } else {
      setItems([...items, { ...newItem, completed: false }]);
    }
  };

  //fungsi edit
  const editedItem = (index, updatedItem) => {
    if (!updatedItem.name) {
      setEditIndex(null);
      return;
    }
    const updatedItems = [...items];
    const editedNameExists = items.some(
      (item, i) =>
        i !== index &&
        item.name.toLowerCase() === updatedItem.name.toLowerCase()
    );
    const editedNameTrim = items.some(
      (item, i) => i !== index && item.name.trim() === updatedItem.name.trim()
    );
    if (editedNameExists) {
      alert("Tidak Boleh sama");
      return;
    }
    if (editedNameTrim) {
      alert("Tidak Boleh sama");
      return;
    }
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
  };

  // fungsi remove
  const removeItem = (index) => {
    if (confirm("anda yakin ingin menghapusnya?")) {
      setItems(items.filter((item, i) => i !== index));
    } else {
      setEditIndex(null);
    }
  };

  // fungsi checkbox
  const Crosscheck = (index) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    setItems(newItems);
  };

  // fungsi menampilkan item
  const showItem = showCompleted
    ? items.filter((item) => item.completed)
    : showNotCompleted
    ? items.filter((item) => !item.completed)
    : items;

  //fungsi search
  const searchitem = showItem.filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  // fungsi menampilkan jumlah item
  const countItems = (kondisi) => {
    switch (kondisi) {
      case "all":
        return items.length;
      case "done":
        return items.filter((item) => item.completed).length;
      case "todo":
        return items.filter((item) => !item.completed).length;
      default:
        return 0;
    }
  };

  // fungsi delete done
  const deleteCompleted = () => {
    const newItems = items.filter((item) => !item.completed);
    if (confirm("anda yakin ingin menghapus item yang sudah selesai?")) {
      setItems(newItems);
    }
  };

  // fungsi delete all
  const deleteAll = () => {
    if (confirm("anda yakin ingin menghapus semua item?")) {
      setItems([]);
    }
  };

  // input images
  const IMAGES = {
    image1: new URL("./images/logo.jpg", import.meta.url).href,
  };
  const IMAGES2 = {
    image2: new URL("./images/search.svg", import.meta.url).href,
  };
  const IMAGES3 = {
    image3: new URL("./images/bg.jpg", import.meta.url).href,
  };

  return (
    <div
      className="flex justify-end"
      style={{
        backgroundImage: `url(${IMAGES3.image3})`,
        backgroundSize: "cover",
        height: "100vh",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div className="container w-2/5 px-1 h-max mr-36  rounded-xl shadow-2xl shadow-slate-800  border-black mt-32">
        <div className="">
          <form
            className="mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              //
              const newItemName = e.target.itemName.value;
              const title = e.target.title.value;
              addItem({
                id: Date.now(),
                name: newItemName,
                title,

                //
              });
              e.target.reset();
            }}
          >
            <div className="flex ml-5 justify-between">
              <div className="">
                <input
                  type="text"
                  name="itemName"
                  placeholder=" Item Name"
                  className="border-b-2 py-3 pl-1 text-sm mr-4 "
                />

                {/*  */}
                <input
                  type="text"
                  name="title"
                  placeholder=" Image Link"
                  className="border-b-2 py-3 pl-1 text-sm"
                />
                {/*  */}

                <button
                  type="submit"
                  className="bg-blue-600 text-white ml-4 rounded-full mb-5 hover:bg-white hover:text-black"
                >
                  add
                </button>
              </div>
              <div className=" w-52 mr-8  ">
                <img src={IMAGES.image1} />
              </div>
            </div>
          </form>
        </div>

        <div className="flex justify-between mt-7 ">
          <div className="flex">
            <div>
              <button
                onClick={() => {
                  setShowAll(true);
                  setShowCompleted(false);
                  setShowNotCompleted(false);
                }}
                className="border-black text-black ml-4 mb-5 px-11 py-3 rounded-sm hover:bg-black hover:border-white hover:text-white "
              >
                All ({countItems("all")})
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setShowCompleted(true);
                  setShowAll(false);
                  setShowNotCompleted(false);
                }}
                className="border-black text-black ml-4 mb-5 px-11 py-3 rounded-sm hover:bg-black hover:border-white hover:text-white"
              >
                Done ({countItems("done")})
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setShowNotCompleted(true);
                  setShowAll(false);
                  setShowCompleted(false);
                }}
                className="border-black text-black ml-4 mb-5 px-11 py-3 rounded-sm hover:bg-black hover:border-white hover:text-white"
              >
                Todo ({countItems("todo")})
              </button>
            </div>
          </div>

          <div className="">
            <input
              type="text"
              placeholder="Search"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              className="border-2 border-black py-3 px-5 mr-7"
              style={{
                backgroundImage: `url(${IMAGES2.image2})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "190px",
                filter: "opacity(50%) brightness(90%)",
              }}
            />
          </div>
        </div>

        <div className="">
          <ul>
            {searchitem.map((item, index) => (
              <li
                key={item.id}
                className="flex justify-between items-center my-5 mx-5 border-b-2 border-black"
              >
                {editIndex === index ? (
                  <>
                    <input
                      className="flex-auto mx-6 text-start  px-4 py-2 text-black my-5"
                      type="text"
                      placeholder={item.name}
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />

                    <button
                      className="bg-blue-500 text-white mr-2 rounded-sm hover:bg-white hover:border-blue-500 hover:text-black"
                      onClick={() => {
                        editedItem(index, { ...item, name: editedName });
                        setEditedName("");
                      }}
                    >
                      save
                    </button>
                    <button
                      className="bg-red-500 text-white mr-2 rounded-sm hover:bg-white hover:border-red-500 hover:text-black"
                      onClick={() => {
                        setEditIndex();
                      }}
                    >
                      cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div className="">
                      <span
                        className={`${item.completed ? "line-through" : ""}`}
                      >
                        {" "}
                        <div className="flex">
                          <img
                            width={100}
                            className="my-4 ml-4"
                            src={item?.title}
                          />
                          <div className="mt-8 ml-7 ">{item.name}</div>
                        </div>
                      </span>
                    </div>

                    <div>
                      <input
                        type="checkbox"
                        className="mx-4"
                        checked={item.completed}
                        onChange={() => Crosscheck(index)}
                      />
                      <button
                        className="border-black text-black mr-2 ml-4 my-2 rounded-sm hover:bg-blue-500 hover:border-blue-500 hover:text-white"
                        onClick={() => setEditIndex(index)}
                      >
                        edit
                      </button>

                      <button
                        className="border-red-500 text-black mr-2 rounded-sm hover:bg-red-500 hover:border-red-500 hover:text-white"
                        onClick={() => removeItem(index)}
                      >
                        remove
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className=" flex justify-end ml-8 mt-8">
          <div className="flex mr-8">
            <div>
              <button
                onClick={() => {
                  deleteCompleted("");
                }}
                className="bg-blue-600 text-white mb-5 hover:border-white rounded-sm "
              >
                Delete done
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  deleteAll("");
                }}
                className="bg-red-500 hover:border-white text-white ml-2 w-28 rounded-sm "
              >
                Delete all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDo;

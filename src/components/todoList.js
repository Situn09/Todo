import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { TodoContext } from "../contexts/todoContext";
import { List } from "@mui/material";

export default function VirtualizedList({ userId }) {
  const { userTodoList, fetchData } = React.useContext(TodoContext);
  const [showItem, setShowItem] = React.useState(false);
  const [itemDetail, setItemDetail] = React.useState({});
  const [completeStatus, setCompleteStatus] = React.useState(null);
  const completeButtonColor = itemDetail.completed ? "#0B8A00" : "#FF4C4C";
  const itemOnClick = (e, id) => {
    const item = userTodoList.filter((item) => item.id == id);
    setShowItem(true);
    setItemDetail(item[0]);
    setCompleteStatus(item[0].completed);
  };
  const deleteTodo = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((res) => {
        console.warn("something went wrong");
        fetchData();
      });
    });
  };
  const completedButton = (id, status) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: completeStatus,
      }),
    }).then((result) => {
      result.json().then((res) => {
        console.warn("something went wrong");
        fetchData();
      });
    });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          borderRadius: "33px",
          background: "#e0e0e0",
          boxShadow: "24px 24px 45px #bebebe, -24px -24px 45px #ffffff",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 400,
            borderRadius: "33px",
            bgcolor: "background.paper",
            overflow: "auto",
          }}
        >
          <List>
            {userTodoList
              ?.filter((item) => {
                return userId ? item.userId == userId : true;
              })
              .map((item, index) => {
                return (
                  <ListItem
                    key={item.id}
                    component="div"
                    onClick={(event) => itemOnClick(event, item.id)}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemText primary={`Item ${item.title}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        </Box>
        {showItem ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div>
              <div>
                <span style={{ fontWeight: "bold" }}>Title: </span>
                {itemDetail.title}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>User Id: </span>
                {itemDetail.userId}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
                padding: "25px 0",
              }}
            >
              <div
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#FF4C4C",
                  color: "white",
                  borderRadius: "20px",
                }}
                onClick={() => deleteTodo(itemDetail.id)}
              >
                <button style={{ borderRadius: "20px", width: "100%" }}>
                  Delete
                </button>
              </div>
              <div
                style={{
                  padding: "5px 10px",
                  backgroundColor: `${completeButtonColor}`,
                  color: "white",
                  borderRadius: "20px",
                }}
                onClick={() =>
                  completedButton(itemDetail.id, itemDetail.completed)
                }
              >
                <button style={{ borderRadius: "20px", width: "100%" }}>
                  {itemDetail.completed ? "Completed" : "Uncompleted"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { TodoContext } from "../contexts/todoContext";
import { List } from "@mui/material";

export default function VirtualizedList({ userId }) {
  const { userTodoList } = React.useContext(TodoContext);
  const [showItem, setShowItem] = React.useState(false);
  const [itemDetail, setItemDetail] = React.useState({});
  const completeButtonColor = itemDetail.completed ? "#0B8A00" : "#FF4C4C";
  const itemOnClick = (e, id) => {
    const item = userTodoList.filter((item) => item.id == id);
    setShowItem(true);
    setItemDetail(item[0]);
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
              >
                Delete
              </div>
              <div
                style={{
                  padding: "5px 10px",
                  backgroundColor: `${completeButtonColor}`,
                  color: "white",
                  borderRadius: "20px",
                }}
              >
                {itemDetail.completed ? "Completed" : "Uncompleted"}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

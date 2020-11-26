/*
 * Copyright Vivek Nigam, 2020
 * Licensed under the GNU General Public License, Version 3.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

import {
  Box,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_INFO } from "../../../../redux/actionTypes";
import FloatingAddButton from "../../../FloatingAddButton";
import RemoveButton from "../../../RemoveButton";
const useStyles = makeStyles((theme) => ({
  TextField: {
    marginTop: "1rem",
  },
  heading: {
    fontFamily: "Roboto",
    fontWeight: 400,
  },
  subtitle: {
    fontSize: "0.8rem",
  },
  desc: {
    minHeight: "3rem",
  },
  tags: {
    marginRight: "0.2rem",
  },
  paper: {
    display: "flex",
    minWidth: "25rem",
    flexDirection: "column",
    padding: "1rem",
    margin: "1rem",
    marginLeft: "0rem",
    borderRadius: "1rem",
    backgroundColor: theme.palette.contrast.light,
  },
}));

function ProjectInfo() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projectInfo);
  const [project, setProject] = useState({ description: `` });
  const [currId, setCurrId] = useState(0);

  const handleAdd = () => {
    const len = projects.length;
    const id = len ? projects[len - 1].id + 1 : 0;
    dispatch({ type: PROJECT_INFO.ADD, id });
  };

  const handleDelete = (id) => {
    dispatch({ type: PROJECT_INFO.DELETE, id });
  };

  const handleChange = (e, id) => {
    setCurrId(id);

    e.preventDefault();
    const field = e.target.name;
    const value = e.target.value;

    setProject({ [field]: value });
  };

  React.useEffect(() => setProject({}), [currId]);

  React.useEffect(() => {
    dispatch({
      type: PROJECT_INFO.UPDATE,
      payload: project,
      id: currId,
    });
  }, [dispatch, project, currId]);

  return (
    <Box display="flex" flexDirection="column" mt={1} p={2}>
      <Typography color="primary" variant="body1" className={classes.heading}>
        Showcase your best work!
      </Typography>
      <Typography
        color="textSecondary"
        variant="subtitle1"
        className={classes.subtitle}
      >
        Add details about your top 2/3 projects which align with your job
        profile!
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyItems="space-evenly"
        width="35rem"
        overflow="auto"
      >
        {projects.map((item) => (
          <Paper elevation={2} className={classes.paper} key={item.id}>
            <TextField
              label="Project Name"
              name="projectTitle"
              variant="outlined"
              color="secondary"
              className={classes.TextField}
              required
              onChange={(e) => handleChange(e, item.id)}
            />
            <TextField
              InputProps={{ classes: { input: classes.desc }, rowsMax: 2 }}
              variant="outlined"
              color="secondary"
              label="What it is about?"
              name="description"
              placeholder="Write a short description about your role in the project"
              multiline
              className={classes.TextField}
              onChange={(e) => handleChange(e, item.id)}
            />
            <TextField
              variant="outlined"
              size="small"
              label="Where to find it?"
              name="projectLink"
              type="link"
              color="secondary"
              placeholder="Github/Website/Blog link"
              className={classes.TextField}
              onChange={(e) => handleChange(e, item.id)}
            />
            <RemoveButton onClick={() => handleDelete(item.id)} />
          </Paper>
        ))}
        <FloatingAddButton onClick={handleAdd} />
      </Box>
    </Box>
  );
}

export default ProjectInfo;

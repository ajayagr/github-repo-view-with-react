import React from 'react';

import classes from './IssueAssignmentDetail.module.css';

const issueAssignmentDetail = props => {
    console.log(props);
    let assignees,milestone, projects, labels;
    let count = props.issue.assignees.totalCount;
    
    //Calculating assignees
    if (count === 0){
        assignees = "No one assigned";
    }else{
        assignees = [];
        props.issue.assignees.edges.map((assignee) => {
            assignees.push(assignee.node.login);
            return 1;
        })
        assignees = assignees.join(',');
        if (count > 2){
            assignees = assignees + ",..."
        }
    }

    //Calculating Labels
    count = props.issue.labels.totalCount
    if (count === 0){
        labels = "None yet";
    }else{
        labels = [];
        props.issue.labels.edges.map((label) => {
            labels.push(label.node.name);
            return 1;
        })
        labels = labels.join(', ');
        if (count > 2){
            labels = labels + ",..."
        }
    }
    
    //Calculating projects
    count = props.issue.projectCards.totalCount
    if (count === 0){
        projects = "None yet";
    }else{
        projects = [];
        props.issue.projectCards.edges.map((project) => {
            projects.push(project.node.project.name);
            return 1;
        })
        projects = projects.join(',');
        if (count > 2){
            projects = projects + ",..."
        }
    }

    //Calculating Milestone
    milestone = props.issue.milestone ? props.issue.milestone.title : "No milestone";

    return(
        <div className={classes.Container}>
            <div className={classes.Item}>
                <div className={classes.ItemHeading}>Assignees</div>
                <div className={classes.ItemValue}>{assignees}</div>
            </div>
            <hr />
            <div className={classes.Item}>
                <div className={classes.ItemHeading}>Labels</div>
                <div className={classes.ItemValue}>{labels}</div>
            </div>
            <hr />
            <div className={classes.Item}>
                <div className={classes.ItemHeading}>Projects</div>
                <div className={classes.ItemValue}>{projects}</div>
            </div>
            <hr />
            <div className={classes.Item}>
                <div className={classes.ItemHeading}>Milestone</div>
                <div className={classes.ItemValue}>{milestone}</div>
            </div>
            <hr />
        </div>
    )
}

export default issueAssignmentDetail;
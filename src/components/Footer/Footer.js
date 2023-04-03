import React from "react";
import PropTypes from "prop-types";
import TasksFilter from "../TasksFilter/TasksFilter";
import "./Footer.css";

const Footer = ({ count, onClearCompleted, filter, onFilterChange }) => {
    Footer.defaultProps = {
        count: 0,
        onClearCompleted: () => {},
        filter: 'all',
        onFilterChange: () => {}
    
    }

    Footer.propTypes = {
        count: PropTypes.number,
        onClearCompleted: PropTypes.func,
        filter: PropTypes.string,
        onFilterChange: () => {}
    }

    
    return (
        <footer className="footer">
            <span className="todo-count">{count} items left</span>
            <TasksFilter filter={filter} 
            onFilterChange={onFilterChange} />
            <button className="clear-completed" 
            onClick={onClearCompleted}>
            Clear completed
            </button>
        </footer>
    );
    
}



export default Footer;

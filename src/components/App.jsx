import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { addReminder, deleteReminder, clearReminders } from '../actions';
// import { bindActionCreators } from 'redux';

class App extends Component {
    state = {
        text: '',
        dueDate: ''
    }

    addReminder = () => {
        console.log('this.sate.dueDate', this.state.dueDate);
        this.props.addReminder(this.state.text, this.state.dueDate);
    }

    deleteReminder = (id) => {
        console.log('deleting in application', id);
        console.log('this.props', this.props);
        this.props.deleteReminder(id);
    }

    renderReminders = () => {
        const { reminders } = this.props;
        return (
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        return (
                            <li
                                key={reminder.id}
                                className="list-group-item"
                            >
                                <div className="list-item">
                                    <div>{reminder.text}</div>
                                    <div>
                                        <em>
                                            {moment(new Date(reminder.dueDate)).fromNow()}
                                        </em>
                                    </div>
                                </div>
                                <div
                                    className="list-item delete-button"
                                    onClick={() => this.deleteReminder(reminder.id)}>
                                    &#x2715;
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
    
    render() {
        return (
            <div className="App">
                <div className="title">
                    Reminder Pro
                </div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="I have to..."
                            onChange={event => this.setState({text: event.target.value})}
                        />
                        <input
                            type="datetime-local"
                            className="form-control"
                            onChange={event => this.setState({dueDate: event.target.value})}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.addReminder}
                    >
                        Add Reminder
                    </button>
                </div>
                { this.renderReminders() }
                <div
                    className="btn btn-danger"
                    onClick={this.props.clearReminders}>
                    Clear Reminders
                </div>
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({addReminder}, dispatch);
// }

// export default connect(null, mapDispatchToProps)(App);

function mapStateToProps(state) {
    return {
        reminders: state
    };
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);
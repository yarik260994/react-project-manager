import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as HomeStore from '../store/Home';
import { actionCreators } from '../store/Auth';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/home.css';
import BigCalendar from 'react-big-calendar';
import * as moment from 'moment';
import TaskModal from './TaskModal';
import { Button } from 'react-bootstrap';
import AddTaskModal from './AddTaskModal';

type HomeProps = ApplicationState & typeof HomeStore.actionCreators & typeof actionCreators & RouteComponentProps<{}>;
BigCalendar.momentLocalizer(moment);

class Home extends React.Component<HomeProps, {}> {
    public componentWillMount() {
        this.props.auth.isAuth && this.props.loadData() ;
    }
    public render() {
        let tasks = this.props.home.tasks.map(el => {
            return {
                id: el.taskID,
                title: el.title,
                start: new Date(el.start.toString()),
                end: new Date(el.end.toString())
            }
        })
        
        return <div>

            <h1>Calendar</h1>
            <div className="top-panel">
                <AddTaskModal  onAdd ={this.props.addTask}/>
            </div>
            
            <BigCalendar events={tasks} onSelectEvent={(event) => this.props.selectTask(event.id)} startAccessor='start' endAccessor='end' style={{ height: 800 }} />
            <TaskModal />
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state,
    { loadData: HomeStore.actionCreators.loadData, 
        login: actionCreators.login, 
        selectTask: HomeStore.actionCreators.selectTask,
    addTask :  HomeStore.actionCreators.addTask}
)(Home) as typeof Home;
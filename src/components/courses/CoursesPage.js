import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CourseList from './CourseList';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      course: {title: ""}
    };
  }



  courseRow(course, index) {
    return(
      <div key={index}>{course.title}</div>
    );
  }


  render() {
    const {courses} = this.props;
    return(
      <div>
        <h1>Courses</h1>
        <CourseList courses={courses}/>
      </div>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //without bindActionCreators
    //createCourse: course => dispatch(courseActions.createCourse(course))
    actions: bindActionCreators(courseActions, dispatch)
  };
}

//conn = connect(mapStateToProps, mapDispatchToProps)
//export default conn(CoursesPage);
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

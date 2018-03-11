import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import toastr from 'toastr';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
          course: Object.assign({}, this.props.course),
          errors: {},
          saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if(this.props.id !== nextProps.course.id) {
        this.setState({course: Object.assign({}, nextProps.course)});
      }
    }


    updateCourseState(event) {
      const field = event.target.name;
      let course = Object.assign({}, this.state.course);
      course[field] = event.target.value;
      return this.setState({course: course});
    }

    saveCourse(event) {
      event.preventDefault();
      this.setState({saving: true});
      this.props.actions.saveCourse(this.state.course)
        .then(() => this.redirect())
        .catch(err => {
          toastr.error(err);
          this.setState({saving: false});
        });
    }

    redirect() {
      this.setState({saving: false});
      toastr.success('Course Saved');
      this.context.router.push('/courses');
    }

    render() {
      return (
        <CourseForm
          allAuthors={this.props.authors}
          course={this.state.course}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          errors={this.state.errors}
          saving={this.state.saving}/>
      );
    }

}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  id: PropTypes.string
};

//Pull in the React Router Context so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id === id);
  if(course) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  const courseId = ownProps.params.id;  //from the path '/course/:id'
  if(courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropDown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropDown
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

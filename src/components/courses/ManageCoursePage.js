import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import toastr from 'toastr';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {authorsFormattedForDropDown} from "../../selectors/selector";

export class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
          course: Object.assign({}, this.props.course),
          //defaultAuthor: this.props.defaultAuthor,
          errors: {},
          saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if(this.props.id !== nextProps.course.id) {
        this.setState({
          course: Object.assign({}, nextProps.course),
          defaultAuthor: nextProps.defaultAuthor
        });
      }
    }


    updateCourseState(event) {
      const field = event.target.name;
      //if(field ==='authorId'){this.props.defaultAuthor=event.target.value;}
      let course = Object.assign({}, this.state.course);
      course[field] = event.target.value;
      return this.setState({
        course: course,
        //defaultAuthor: this.props.defaultAuthor
      });
    }

    //updatAuthorState(event)

    courseFormIsValid() {
      let formIsValid = true;
      let errors = {};

      if(this.state.course.title.length<5) {
        errors.title = 'Title must be at least 5 characters';
        formIsValid = false;
      }

      this.setState({errors: errors});
      return formIsValid;
    }

    saveCourse(event) {
      event.preventDefault();
      if(!this.courseFormIsValid()) {
        return;
      }
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
  //defaultAuthor: PropTypes.string.isRequired,
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

function getAuthorByAuthorId(id, authors) {
  const author = authors.filter(author => id === author.value);
  if (author) return author[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  const courseId = ownProps.params.id;  //from the path '/course/:id'
  if(courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const formattedAuthors = authorsFormattedForDropDown(state.authors);
  // let defaultAuthor = "Select Author";
  // if(formattedAuthors && course.id) {
  //   const gottenAuthor = getAuthorByAuthorId(course.authorId, formattedAuthors);
  //   defaultAuthor = gottenAuthor ? gottenAuthor.text : "SelectAuthor";
  // }


  return {
    course: course,
    authors: formattedAuthors,
    //defaultAuthor: defaultAuthor
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

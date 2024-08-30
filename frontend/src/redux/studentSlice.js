import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  student: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudent(state, action) {
      state.student = action.payload;
    },
    clearStudent(state) {
      state.student = null; // Clear student data
    },
    registerCourse(state, action) {
      if (state.student) {
        state.student.courses.push(action.payload);
      }
    },
    markCourseAsCompleted(state, action) {
      const course = state.student.courses.find(course => course._id === action.payload);
      if (course) {
        course.completed = true;
      }
    },
  },
});

export const { setStudent, clearStudent, registerCourse, markCourseAsCompleted } = studentSlice.actions;

export default studentSlice.reducer;

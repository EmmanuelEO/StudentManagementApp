package com.example.StudentManagementApp.student;

import com.example.StudentManagementApp.student.exception.BadRequestException;
import com.example.StudentManagementApp.student.exception.StudentNotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepo studentRepo;
    private StudentService insideTest;

    @BeforeEach
    void setUp() {
        insideTest = new StudentService(studentRepo);
    }

    // All the tests below are using AssertJ's provided tests
    @Test
    void canRetrieveAllStudents() {
        // When -- Since // Given has already been accounted for above
        insideTest.getAllStudents();

        // Then
        verify(studentRepo).findAll();
    }

    @Test
    void canStudentBeAdded() {
        // Given
        Student student = new Student(
                "Mathews",
                "mathews12@gmail.com",
                Gender.FEMALE
        );

        // When
        insideTest.addStudent(student);

        // Then
        ArgumentCaptor<Student> studentArgumentCaptor = ArgumentCaptor.forClass(Student.class);

        verify(studentRepo).save(studentArgumentCaptor.capture());

        // Here, we're comparing the inputted student to the addStudent  function to the student that was saved by invoking the studentRepo.save() function
        Student capturedStudent = studentArgumentCaptor.getValue();

        assertThat(capturedStudent).isEqualTo(student);
    }

    @Test
    void wouldBeErrorWhenStudentEmailIsTaken() {
        // Given
        Student student = new Student(
                "Mathews",
                "mathews12@gmail.com",
                Gender.FEMALE
        );

        given(studentRepo.existsEmail(anyString())).willReturn(true);

        // When
        // Then
        assertThatThrownBy(() -> insideTest.addStudent(student))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("The email " + student.getEmail() +
                        " has already been taken by another student");

        // To verify that the line of code below the if statement does not run whenever the throw function is initialized I'll run:
        verify(studentRepo, never()).save(any());

    }

    @Test
    void wouldBeErrorWhenStudentIsNotDeleted() {
        // Given
        long id = 23;
        given(studentRepo.existsById(id)).willReturn(false);

        // When
        assertThatThrownBy(() -> insideTest.deleteStudent(id))
                .isInstanceOf(StudentNotFoundException.class)
                .hasMessageContaining("The student with ID " + id + " that you want to delete does not exist.");

        // Then
        verify(studentRepo, never()).save(any());
    }

    @Test
    void isStudentDeleted() {
        // Given
        long id = 23;
        given(studentRepo.existsById(id)).willReturn(true);

        // When
        insideTest.deleteStudent(id);

        // Then
        verify(studentRepo).deleteById(id);
    }
}
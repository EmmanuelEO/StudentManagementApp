package com.example.StudentManagementApp.student;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class StudentRepoTest {

    private StudentRepo insideTest;

    // The two methods below represent testing for the Query that was created in the database
    @Test
    void checkIfStudentExistsByEmail() {
        // Given
        String email = "mathews12@gmail.com";
        Student student = new Student(
                "Mathews",
                email,
                Gender.FEMALE
        );
        insideTest.save(student);

        // When
        boolean expected = insideTest.existsEmail(email);

        // Then
        assertThat(expected).isTrue();
    }

    @Test
    void checkIfStudentDoesNotExistByEmail() {
        // Given
        String email = "mathews12@gmail.com";

        // When
        boolean expected = insideTest.existsEmail(email);

        // Then
        assertThat(expected).isFalse();
    }

    @AfterEach
    void setUp() {
        insideTest.deleteAll();
    }
}
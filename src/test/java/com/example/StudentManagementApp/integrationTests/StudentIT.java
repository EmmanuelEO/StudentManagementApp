package com.example.StudentManagementApp.integrationTests;

import com.example.StudentManagementApp.student.Student;
import com.example.StudentManagementApp.student.StudentRepo;
import com.example.StudentManagementApp.student.Gender;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
@AutoConfigureMockMvc
public class StudentIT {
    // Note that the class should be prefixed with IT because the maven plugin would only look run integration tests on classes that end with IT

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private StudentRepo studentRepo;

    @Test
    void canAddNewStudent() throws Exception {
        // Given
        Student student = new Student(
                "Mathews",
                "abscd@gmail.com",
                Gender.FEMALE
        );
        // When
        // Note: The objectMapper.writeValueAsString() function converts student to a JSON payload content
        ResultActions resultActions = mockMvc
                .perform(post("/api/v1/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(student)));
        // Then
        resultActions.andExpect(status().isOk());
        List<Student> students = studentRepo.findAll();
        assertThat(students).usingElementComparatorIgnoringFields("id").contains(student);
    }
}
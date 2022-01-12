package com.example.StudentManagementApp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


class DemoApplicationTests {
	Calculator insideTest = new Calculator();


	@Test
	void addNumbers() {
		// Given
		int one = 10;
		int two = 30;

		// When
		int result = insideTest.add(one, two);

		// Then
		int expected = 40;
		assertThat(result).isEqualTo(expected);
	}

	class Calculator {
		int add (int a, int b) {
			return a + b;
		}
	}

}

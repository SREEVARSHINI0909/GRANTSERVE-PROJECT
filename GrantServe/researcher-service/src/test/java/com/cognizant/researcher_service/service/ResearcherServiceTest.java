package com.cognizant.researcher_service.service;

import com.cognizant.researcher_service.dto.RegisterresponseDto;
import com.cognizant.researcher_service.dto.ResearcherDto;
import com.cognizant.researcher_service.entity.Researcher;
import com.cognizant.researcher_service.exception.ResearcherException;
import com.cognizant.researcher_service.repository.ResearcherRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ResearcherServiceTest {

    @Mock
    private ResearcherRepository researcherRepository;

    @InjectMocks
    private ResearcherServiceImpl researcherService;

    private ResearcherDto researcherDto;
    private RegisterresponseDto registerResponseDto;
    private Researcher researcherEntity;

    @BeforeEach
    void setUp() {
        // FIXED ORDER: LocalDate moved to 3rd position, Gender moved to 4th
        researcherDto = new ResearcherDto(
                "Sree",                                // 1. name
                "101",                                 // 2. contactInfo
                LocalDate.parse("1995-09-09"),         // 3. dob (Required: LocalDate)
                "Female",                              // 4. gender (Required: String)
                "Cognizant University",                // 5. institution
                "IT"                                   // 6. department
        );

        registerResponseDto = new RegisterresponseDto("Sree", 101L);

        researcherEntity = new Researcher();
        researcherEntity.setResearcherID(1L);
        researcherEntity.setName("Sree");
        researcherEntity.setUserid(101L);
        researcherEntity.setStatus("PENDING_PROFILE");
    }

    @Test
    @DisplayName("Registration - Should save researcher skeleton from Auth-Service DTO")
    void testRegisterNewResearcher_Success() {
        // Arrange
        when(researcherRepository.save(any(Researcher.class))).thenReturn(researcherEntity);

        // Act
        String result = researcherService.registerNewResearcher(registerResponseDto);

        // Assert
        assertNotNull(result);
        verify(researcherRepository, times(1)).save(any(Researcher.class));
    }

    @Test
    @DisplayName("Fetch - Should throw exception when researcher ID does not exist")
    void testFetchResearcher_NotFound() {
        // Arrange
        when(researcherRepository.findResearcherByResearcherID(99L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResearcherException.class, () -> researcherService.fetchResearcher(99L));
    }

    @Test
    @DisplayName("Update - Should successfully update researcher details")
    void testUpdateResearcher_Success() throws ResearcherException {
        // Arrange
        when(researcherRepository.findById(1L)).thenReturn(Optional.of(researcherEntity));
        when(researcherRepository.save(any(Researcher.class))).thenReturn(researcherEntity);

        // Act
        String result = researcherService.UpdateResearcher(1L, researcherDto);

        // Assert
        assertEquals("Researcher Updated Successfully", result);
        verify(researcherRepository, times(1)).save(any(Researcher.class));
    }
}
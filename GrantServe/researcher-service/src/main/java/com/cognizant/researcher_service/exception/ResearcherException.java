package com.cognizant.researcher_service.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ResearcherException extends RuntimeException {

    private final HttpStatus status;

    public ResearcherException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
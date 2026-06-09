package com.cognitivefitness.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends ApiException {

    public ResourceNotFoundException(String resource, String id) {
        super(resource + " not found with id: " + id, HttpStatus.NOT_FOUND);
    }
}
package com.example.loveproject.mapper;

import com.example.loveproject.dto.request.MessageDtoRequest;
import com.example.loveproject.dto.response.MessageDtoResponse;
import com.example.loveproject.entity.MessageEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public abstract class MessageMapper {

    public abstract MessageDtoResponse toResponse(MessageEntity entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    public abstract MessageEntity toEntity(MessageDtoRequest request);
}

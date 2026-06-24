package com.example.loveproject.mapper;

import com.example.loveproject.dto.request.SettingDtoRequest;
import com.example.loveproject.dto.response.SettingDtoResponse;
import com.example.loveproject.entity.SettingEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public abstract class SettingMapper {

    public abstract SettingDtoResponse toResponse(SettingEntity entity);

    @Mapping(target = "id", ignore = true)
    public abstract SettingEntity toEntity(SettingDtoRequest request);
}

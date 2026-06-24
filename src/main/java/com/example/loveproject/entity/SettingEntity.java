package com.example.loveproject.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Builder
@Table(name = "settings")
@NoArgsConstructor
@AllArgsConstructor
public class SettingEntity {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Size(max = 255)
    @Column(name = "couple_names")
    private String coupleNames;


}
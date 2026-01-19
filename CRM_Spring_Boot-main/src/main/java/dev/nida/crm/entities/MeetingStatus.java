package dev.nida.crm.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "meeting_status")
public class MeetingStatus extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    public MeetingStatus() {}

    public MeetingStatus(Status status) {
        this.status = status;
    }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public enum Status {
        PLANNED,
        REALIZED,
        CANCELED
    }
}

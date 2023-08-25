export type TrackObject = {
    album: {
        album_type: "album" | "single" | "compilation",
        total_tracks: number,
        available_markets: string[],
        external_urls: {
            spotify: string
        },
        href: string,
        id: string,
        images: ImageObject[],
        name: string,
        release_date: string,
        release_date_precision: "year" | "month" | "day",
        type: "album",
        uri: string,
        copyrights: CopyrightObject[],
        external_ids: {
            isrc: string,
            ean: string,
            upc: string
        },
        genres: string[],
        label: string,
        populatiry: number,
        artists: SimplifiedArtistObject[]
    },
    artists: ArtistObject[],
    duration_ms: number,
    explicit: boolean,
    external_ids: {
        isrc: string,
        ean: string,
        upc: string
    },
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    is_playable: boolean,
    name: string,
    popularity: number,
    preview_url: string,
    track_number: number,
    type: "track",
    uri: string,
    is_local: boolean
}

export type EpisodeObject = {
    audio_preview_url: string,
    description: string,
    html_description: string,
    duration_ms: number,
    explicit: boolean,
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    /**
     * Widest image first
     */
    images: ImageObject[],
    is_externally_hosted: boolean,
    is_playable: boolean,
    languages: string[],
    name: string,
    release_date: string,
    release_date_precision: "year" | "month" | "day",
    resume_point: {
        fully_played: boolean,
        resume_position_ms: number
    },
    type: "episode",
    uri: string,
    show: {
        available_markets: string[],
        copyrights: CopyrightObject[],
        description: string,
        html_description: string,
        explicit: boolean,
        external_urls: {
            spotify: string
        },
        href: string,
        id: string,
        images: ImageObject[],
        is_externally_hosted: boolean,
        languages: string[],
        media_type: string,
        name: string,
        publisher: string,
        type: "show",
        uri: string,
        total_episodes: number
    }
}

export type ImageObject = {
    width: number,
    height: number,
    url: string
}

export type CopyrightObject = {
    text: string,
    type: string
}

export type AlbumObject = {
    album_type: "album" | "single" | "compilation",
    total_tracks: number,
    available_markets: string[],
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    images: ImageObject[],
    name: string,
    release_date: string,
    release_date_precision: "year" | "month" | "day",
    restrictions: {
        reason: "market" | "product" | "explicit"
    },
    type: "album",
    uri: string,
    copyrights: CopyrightObject[],
    external_ids: {
        isrc: string,
        ean: string,
        upc: string
    },
    genres: string[],
    label: string,
    /**
     * Number between 0 and 100
     */
    popularity: number,
    artists: ArtistObject[],
    tracks: {
        href: string,
        limit: number,
        next: string | null,
        offset: number,
        previous: string | null,
        total: number,
        items: SimplifiedTrackObject[]
    }
}

export type ArtistObject = {
    external_urls: {
        spotify: string
    },
    followers: {
        href: string | null,
        total: number
    },
    genres: string[],
    href: string,
    id: string,
    images: ImageObject[],
    name: string,
    popularity: number,
    type: "artist",
    uri: string,
}

export type SimplifiedTrackObject = {
    artists: SimplifiedArtistObject[],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    is_playable: boolean,
    name: string,
    preview_url: string,
    track_number: number,
    type: "track",
    uri: string,
    is_local: boolean
}

export type SimplifiedArtistObject = {
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    name: string,
    type: "artist",
    uri: string
}

export type SimplifiedAlbumObject = {
    album_type: "album" | "single" | "compilation",
    total_tracks: number,
    available_markets: string[],
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    images: ImageObject[],
    name: string,
    release_date: string,
    release_date_precision: "year" | "month" | "day",
    restrictions: {
        reason: "market" | "product" | "explicit"
    },
    type: "album",
    uri: string,
    copyrights: CopyrightObject[],
    external_ids: {
        isrc: string,
        ean: string,
        upc: string
    },
    genres: string[],
    label: string,
    popularity: number,
    album_group: "album" | "single" | "compilation" | "appears_on",
    artists: SimplifiedArtistObject[]
}

export type SimplifiedPlaylistObject = {
    collaborative: boolean,
    description: string,
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    images: ImageObject[],
    name: string,
    public: boolean,
    snapshot_id: string,
    tracks: {
        href: string,
        total : number
    },
    type: "playlist",
    uri: string
}

export type ResponseProperties<T> = {
    href: string,
    limit: number,
    next: string | null,
    offset: number,
    previous: string | null,
    total: number,
    items: T[]
}

export type SavedTrackObject = {
    added_at: string,
    track: {
        album: {
            album_type: "album" | "single" | "compilation",
            total_tracks: number,
            available_markets: string[],
            external_urls: {
                spotify: string
            },
            href: string,
            id: string,
            images: ImageObject[],
            name: string,
            release_date: string,
            release_date_precision: "year" | "month" | "day",
            type: "album",
            uri: string,
            copyrights: CopyrightObject[],
            external_ids: {
                isrc: string,
                ean: string,
                upc: string
            },
            genres: string[],
            label: string,
            populatiry: number,
            artists: SimplifiedArtistObject[]
        },
        artists: ArtistObject[],
        available_markets: string[],
        disc_number: number,
        duration_ms: number,
        explicit: boolean,
        external_ids: {
            isrc: string,
            ean: string,
            upc: string
        },
        external_urls: {
            spotify: string
        },
        href: string,
        id: string,
        is_playable: boolean,
        name: string,
        popularity: number,
        preview_url: string,
        track_number: number,
        type: "track",
        uri: string,
        is_local: boolean
    }
}
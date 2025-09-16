import React, { useState } from "react";
import {
  Search,
  Eye,
  Calendar,
  BookOpen,
  Upload,
  Home,
  Users,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { lecturesByCourse } from "./data/lectures";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("Histopathology");
  const [selectedLecturer, setSelectedLecturer] = useState("");

  // Function to navigate to specific course
  const goToCourse = (courseName) => {
    setSelectedCourse(courseName);
    setCurrentPage("courses");
  };

  // Function to navigate to lecturer's lectures
  const goToLecturerLectures = (lecturerName) => {
    setSelectedLecturer(lecturerName);
    setCurrentPage("lecturer-lectures");
  };

  // Function to check if lecture is from last 7 days
  const isRecentUpload = (uploadDate) => {
    const today = new Date();
    const fileDate = new Date(uploadDate);
    const diffTime = Math.abs(today - fileDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };


  // Get all lectures as flat array
  const allLectures = Object.values(lecturesByCourse).flat();

  const handlePreview = (lecture) => {
    let previewUrl;

    if (lecture.type === "PPTX") {
      // For PowerPoint slides: Convert edit link to preview
      const fileId = lecture.driveFileId;
      previewUrl = `https://docs.google.com/presentation/d/${fileId}/preview`;
    } else if (lecture.type === "PDF") {
      // For PDF files: Convert view link to preview
      const fileId = lecture.driveFileId;
      previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    }

    window.open(previewUrl, "_blank");
    console.log(`Previewing: ${lecture.title}`);
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentPage("home")}
          >
            <BookOpen className="h-8 w-8 text-gray-800 mr-2" />
            <h1 className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              Department Lectures
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage("home")}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                currentPage === "home"
                  ? "text-white bg-gray-800 shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Home className="h-4 w-4 inline mr-2" />
              Home
            </button>
            <button
              onClick={() => setCurrentPage("courses")}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                currentPage === "courses"
                  ? "text-white bg-gray-800 shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="h-4 w-4 inline mr-2" />
              Courses
            </button>
            <button
              onClick={() => setCurrentPage("lecturers")}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                currentPage === "lecturers"
                  ? "text-white bg-gray-800 shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Users className="h-4 w-4 inline mr-2" />
              Lecturers
            </button>
            <button
              onClick={() => setCurrentPage("notifications")}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                currentPage === "notifications"
                  ? "text-white bg-gray-800 shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Bell className="h-4 w-4 inline mr-2" />
              Recent
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  setCurrentPage("home");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === "home"
                    ? "text-white bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Home className="h-4 w-4 inline mr-2" />
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage("courses");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === "courses"
                    ? "text-white bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <BookOpen className="h-4 w-4 inline mr-2" />
                Courses
              </button>
              <button
                onClick={() => {
                  setCurrentPage("lecturers");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === "lecturers"
                    ? "text-white bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Users className="h-4 w-4 inline mr-2" />
                Lecturers
              </button>
              <button
                onClick={() => {
                  setCurrentPage("notifications");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === "notifications"
                    ? "text-white bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Bell className="h-4 w-4 inline mr-2" />
                Recent
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  // Home Page Component
  const HomePage = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome to Department Lectures
        </h1>
        <p className="text-gray-300 mb-4">
          Access all your course materials in one organized location
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white bg-opacity-10 rounded p-4 text-center border border-gray-600">
            <div className="text-2xl font-bold">
              {Object.keys(lecturesByCourse).length}
            </div>
            <div className="text-sm text-gray-300">Courses</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded p-4 text-center border border-gray-600">
            <div className="text-2xl font-bold">{allLectures.length}</div>
            <div className="text-sm text-gray-300">Lectures</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded p-4 text-center border border-gray-600">
            <div className="text-2xl font-bold">
              {allLectures.filter((l) => isRecentUpload(l.uploadDate)).length}
            </div>
            <div className="text-sm text-gray-300">This Week</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded p-4 text-center border border-gray-600">
            <div className="text-2xl font-bold">
              {[...new Set(allLectures.map((l) => l.lecturer))].length}
            </div>
            <div className="text-sm text-gray-300">Lecturers</div>
          </div>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Uploads</h2>
        <div className="space-y-4">
          {allLectures
            .filter((l) => isRecentUpload(l.uploadDate))
            .slice(0, 5)
            .map((lecture) => (
              <div
                key={lecture.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded"
              >
                <div className="flex items-center">
                  <span className="text-xl mr-3">{lecture.thumbnail}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {lecture.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {Object.keys(lecturesByCourse).find((course) =>
                        lecturesByCourse[course].some(
                          (l) => l.id === lecture.id
                        )
                      )}{" "}
                      • {lecture.lecturer}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handlePreview(lecture)}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Preview
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Course Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Course Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(lecturesByCourse).map(([course, lectures]) => (
            <div
              key={course}
              onClick={() => goToCourse(course)}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-50"
            >
              <h3 className="font-medium text-gray-900 mb-2">{course}</h3>
              <p className="text-sm text-gray-600">
                {lectures.length} lectures
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {lectures.filter((l) => isRecentUpload(l.uploadDate)).length}{" "}
                new this week
              </p>
              <p className="text-xs text-blue-600 mt-2 font-medium">
                Click to view lectures →
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Courses Page Component
  const CoursesPage = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses</h2>

          {/* Course Tabs */}
          <div className="border-b border-gray-200 mb-6 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto text-sm sm:text-base">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {Object.keys(lecturesByCourse).map((course) => (
                <button
                  key={course}
                  onClick={() => setSelectedCourse(course)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    selectedCourse === course
                      ? "border-gray-800 text-gray-800"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {course}
                  <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {lecturesByCourse[course].length}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search lectures..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="PDF">PDF</option>
              <option value="PPTX">PPTX</option>
            </select>
          </div>

          {/* Lectures Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lecturesByCourse[selectedCourse]
              .filter((lecture) => {
                const matchesSearch =
                  lecture.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  lecture.lecturer
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                const matchesType =
                  selectedType === "All" || lecture.type === selectedType;
                return matchesSearch && matchesType;
              })
              .map((lecture) => (
                <div
                  key={lecture.id}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{lecture.thumbnail}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">
                          {lecture.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">
                          {lecture.description}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                            {lecture.type}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          by {lecture.lecturer}
                        </p>
                      </div>
                    </div>
                    {isRecentUpload(lecture.uploadDate) && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                        New
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{lecture.uploadDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Size: {lecture.size}</span>
                      <span>{lecture.uploadDate}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePreview(lecture)}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  // Lecturers Page Component
  const LecturersPage = () => {
    const lecturers = {};

    // Group lectures by lecturer
    allLectures.forEach((lecture) => {
      const course = Object.keys(lecturesByCourse).find((course) =>
        lecturesByCourse[course].some((l) => l.id === lecture.id)
      );

      if (!lecturers[lecture.lecturer]) {
        lecturers[lecture.lecturer] = {
          name: lecture.lecturer,
          courses: new Set(),
          lectures: [],
        };
      }
      lecturers[lecture.lecturer].courses.add(course);
      lecturers[lecture.lecturer].lectures.push(lecture);
    });

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Lecturers</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(lecturers).map((lecturer, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {lecturer.name}
                </h3>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Courses:</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(lecturer.courses).map((course) => (
                      <span
                        key={course}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  <p>{lecturer.lectures.length} lectures</p>
                </div>
                <button
                  onClick={() => goToLecturerLectures(lecturer.name)}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  View All Lectures
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Lecturer-specific lectures page
  const LecturerLecturesPage = () => {
    const lecturerLectures = allLectures.filter(
      (lecture) => lecture.lecturer === selectedLecturer
    );

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Lectures by {selectedLecturer}
              </h2>
              <p className="text-gray-600 mt-1">
                {lecturerLectures.length} lectures
              </p>
            </div>
            <button
              onClick={() => setCurrentPage("lecturers")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              ← Back to Lecturers
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search lectures..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="PDF">PDF</option>
              <option value="PPTX">PPTX</option>
            </select>
          </div>

          {/* Lectures Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lecturerLectures
              .filter((lecture) => {
                const matchesSearch = lecture.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
                const matchesType =
                  selectedType === "All" || lecture.type === selectedType;
                return matchesSearch && matchesType;
              })
              .map((lecture) => {
                const course = Object.keys(lecturesByCourse).find((course) =>
                  lecturesByCourse[course].some((l) => l.id === lecture.id)
                );

                return (
                  <div
                    key={lecture.id}
                    className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">
                          {lecture.thumbnail}
                        </span>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm mb-1">
                            {lecture.title}
                          </h3>
                          <p className="text-xs text-gray-600 mb-2">
                            {lecture.description}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                              {course}
                            </span>
                            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                              {lecture.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      {isRecentUpload(lecture.uploadDate) && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          New
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{lecture.uploadDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Size: {lecture.size}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePreview(lecture)}
                      className="w-full bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </button>
                  </div>
                );
              })}
          </div>

          {lecturerLectures.filter((lecture) => {
            const matchesSearch = lecture.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
            const matchesType =
              selectedType === "All" || lecture.type === selectedType;
            return matchesSearch && matchesType;
          }).length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No lectures found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Notifications/Recent Page Component
  const NotificationsPage = () => {
    const recentLectures = allLectures
      .filter((l) => isRecentUpload(l.uploadDate))
      .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Activity
          </h2>

          {recentLectures.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No recent uploads
              </h3>
              <p className="text-gray-600">
                Check back later for new lecture materials
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentLectures.map((lecture) => {
                const course = Object.keys(lecturesByCourse).find((course) =>
                  lecturesByCourse[course].some((l) => l.id === lecture.id)
                );

                return (
                  <div
                    key={lecture.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="bg-gray-100 rounded-full p-2 mr-4">
                        <Upload className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {lecture.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {course} • {lecture.lecturer} • {lecture.uploadDate}
                        </p>
                        <p className="text-xs text-gray-500">
                          {lecture.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePreview(lecture)}
                      className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded text-sm transition-colors"
                    >
                      Preview
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "courses":
        return <CoursesPage />;
      case "lecturers":
        return <LecturersPage />;
      case "lecturer-lectures":
        return <LecturerLecturesPage />;
      case "notifications":
        return <NotificationsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1655913197692-012897652d13?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
        {renderCurrentPage()}
      </div>

      {/* Footer - Always at bottom */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-300">Consolidating Technology in Medicine</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
